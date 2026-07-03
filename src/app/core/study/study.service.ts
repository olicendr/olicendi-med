import { computed, Injectable, signal } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { BIOCHEM_MODULES, INITIAL_PROGRESS, STUDY_CARDS } from '../mock-data';
import {
  BiochemModule,
  CardProgress,
  LearningStats,
  ModuleStats,
  ReviewGrade,
  ReviewItem,
  StudyCard
} from '../models';

@Injectable({ providedIn: 'root' })
export class StudyService {
  private readonly modules = signal<BiochemModule[]>(BIOCHEM_MODULES);
  private readonly cards = signal<StudyCard[]>(STUDY_CARDS);
  private readonly progress = signal<CardProgress[]>(INITIAL_PROGRESS);

  readonly allModules = computed(() => this.modules());
  readonly allCards = computed(() => this.cards());
  readonly allProgress = computed(() => this.progress());
  readonly stats = computed(() => this.buildStats());

  loadModules(): Observable<BiochemModule[]> {
    return of(this.modules()).pipe(delay(300));
  }

  loadModule(moduleId: string): Observable<BiochemModule | undefined> {
    return this.loadModules().pipe(map((modules) => modules.find((module) => module.id === moduleId)));
  }

  loadCardsByModule(moduleId: string): Observable<StudyCard[]> {
    return of(this.cards().filter((card) => card.moduleId === moduleId)).pipe(delay(360));
  }

  loadDueReviews(): Observable<ReviewItem[]> {
    return of(this.buildReviewItems()).pipe(delay(380));
  }

  submitReview(cardId: string, grade: ReviewGrade): Observable<CardProgress> {
    const nextProgress = this.progress().map((progress) =>
      progress.cardId === cardId ? this.scheduleNext(progress, grade) : progress
    );
    const updated = nextProgress.find((progress) => progress.cardId === cardId)!;

    return of(updated).pipe(
      tap(() => this.progress.set(nextProgress))
    );
  }

  private buildReviewItems(): ReviewItem[] {
    const now = Date.now();
    const modulesById = new Map(this.modules().map((module) => [module.id, module]));
    const progressByCard = new Map(this.progress().map((progress) => [progress.cardId, progress]));

    return this.cards()
      .map((card) => {
        const progress = progressByCard.get(card.id)!;
        const module = modulesById.get(card.moduleId)!;
        return { card, progress, module };
      })
      .filter((item) => new Date(item.progress.dueAt).getTime() <= now)
      .sort((left, right) => left.progress.dueAt.localeCompare(right.progress.dueAt));
  }

  private scheduleNext(progress: CardProgress, grade: ReviewGrade): CardProgress {
    const gradeImpact: Record<ReviewGrade, number> = {
      again: -0.35,
      hard: -0.1,
      good: 0.05,
      easy: 0.15
    };

    const nextEase = Math.max(1.3, progress.easeFactor + gradeImpact[grade]);
    const nextInterval =
      grade === 'again'
        ? 0
        : Math.max(1, Math.round((progress.intervalDays || 1) * nextEase * (grade === 'easy' ? 1.4 : 1)));
    const dueAt = new Date();
    dueAt.setDate(dueAt.getDate() + nextInterval);

    return {
      ...progress,
      status: nextInterval >= 14 ? 'mastered' : 'review',
      repetitions: progress.repetitions + 1,
      easeFactor: nextEase,
      intervalDays: nextInterval,
      dueAt: dueAt.toISOString(),
      lastReviewedAt: new Date().toISOString()
    };
  }

  private buildStats(): LearningStats {
    const progress = this.progress();
    const now = Date.now();
    const dueNow = progress.filter((item) => new Date(item.dueAt).getTime() <= now).length;
    const newCards = progress.filter((item) => item.status === 'new').length;
    const mastered = progress.filter((item) => item.status === 'mastered').length;
    const modules = this.modules().map<ModuleStats>((module) => {
      const moduleCardIds = this.cards()
        .filter((card) => card.moduleId === module.id)
        .map((card) => card.id);
      const moduleProgress = progress.filter((item) => moduleCardIds.includes(item.cardId));
      const moduleMastered = moduleProgress.filter((item) => item.status === 'mastered').length;
      const moduleDue = moduleProgress.filter((item) => new Date(item.dueAt).getTime() <= now).length;
      const reviewed = moduleProgress.filter((item) => item.repetitions > 0).length;

      return {
        moduleId: module.id,
        cardsTotal: moduleCardIds.length,
        dueNow: moduleDue,
        mastered: moduleMastered,
        accuracy: reviewed ? Math.round((moduleMastered / reviewed) * 100) : 0
      };
    });

    return {
      dueNow,
      newCards,
      mastered,
      streakDays: 4,
      averageAccuracy: modules.length
        ? Math.round(modules.reduce((sum, module) => sum + module.accuracy, 0) / modules.length)
        : 0,
      modules
    };
  }
}
