import { Component, inject } from '@angular/core';
import { StudyService } from '../../core/study/study.service';

@Component({
  selector: 'app-stats-page',
  template: `
    <section class="page-heading">
      <span>Статистика</span>
      <h1>Прогресс по карточкам и модулям</h1>
    </section>

    <section class="summary">
      <article>
        <span>Средняя точность</span>
        <strong>{{ stats().averageAccuracy }}%</strong>
      </article>
      <article>
        <span>Освоено</span>
        <strong>{{ stats().mastered }}</strong>
      </article>
      <article>
        <span>Новые</span>
        <strong>{{ stats().newCards }}</strong>
      </article>
    </section>

    <section class="module-stats">
      @for (moduleStat of stats().modules; track moduleStat.moduleId) {
        <article>
          <header>
            <h2>{{ moduleTitle(moduleStat.moduleId) }}</h2>
            <span>{{ moduleStat.accuracy }}%</span>
          </header>
          <div class="progress-bar">
            <span [style.width.%]="moduleStat.cardsTotal ? (moduleStat.mastered / moduleStat.cardsTotal) * 100 : 0"></span>
          </div>
          <p>{{ moduleStat.mastered }} из {{ moduleStat.cardsTotal }} освоено · {{ moduleStat.dueNow }} к повторению</p>
        </article>
      }
    </section>
  `,
  styleUrl: './stats.page.scss'
})
export class StatsPage {
  private readonly study = inject(StudyService);

  readonly stats = this.study.stats;
  readonly modules = this.study.allModules;

  moduleTitle(moduleId: string): string {
    return this.modules().find((module) => module.id === moduleId)?.title ?? moduleId;
  }
}
