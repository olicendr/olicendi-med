import { Component, inject, signal } from '@angular/core';
import { ReviewGrade, ReviewItem } from '../../core/models';
import { StudyService } from '../../core/study/study.service';

@Component({
  selector: 'app-review-page',
  template: `
    <section class="review-layout">
      <div class="review-main">
        <span class="eyebrow">Интервальное повторение</span>
        @if (current(); as item) {
          <article class="review-card">
            <header>
              <span [style.background]="item.module.color">{{ item.module.title }}</span>
              <small>{{ item.progress.status }} · повторений: {{ item.progress.repetitions }}</small>
            </header>

            <h1>{{ item.card.front }}</h1>

            @if (answerShown()) {
              <div class="answer">
                <p>{{ item.card.back }}</p>
                <small>{{ item.card.clinicalNote }}</small>
              </div>

              <div class="grade-grid">
                <button type="button" (click)="grade('again')">Снова</button>
                <button type="button" (click)="grade('hard')">Трудно</button>
                <button type="button" (click)="grade('good')">Хорошо</button>
                <button type="button" (click)="grade('easy')">Легко</button>
              </div>
            } @else {
              <button class="show-answer" type="button" (click)="answerShown.set(true)">Показать ответ</button>
            }
          </article>
        } @else {
          <article class="empty-state">
            <h1>На сегодня все</h1>
            <p>Очередь повторения пуста. Можно открыть модули и посмотреть новые карточки.</p>
          </article>
        }
      </div>

      <aside class="queue">
        <h2>Очередь</h2>
        <strong>{{ queue().length }}</strong>
        <span>карточек сейчас доступно</span>
      </aside>
    </section>
  `,
  styleUrl: './review.page.scss'
})
export class ReviewPage {
  private readonly study = inject(StudyService);

  readonly queue = signal<ReviewItem[]>([]);
  readonly answerShown = signal(false);
  readonly current = signal<ReviewItem | undefined>(undefined);

  constructor() {
    this.reloadQueue();
  }

  grade(grade: ReviewGrade): void {
    const current = this.current();

    if (!current) {
      return;
    }

    this.study.submitReview(current.card.id, grade).subscribe(() => {
      this.answerShown.set(false);
      this.reloadQueue();
    });
  }

  private reloadQueue(): void {
    this.study.loadDueReviews().subscribe((items) => {
      this.queue.set(items);
      this.current.set(items[0]);
    });
  }
}
