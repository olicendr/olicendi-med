import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudyService } from '../../core/study/study.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
  template: `
    <section class="page-heading">
      <span>Учебная панель</span>
      <h1>Биохимия по модулям и повторениям</h1>
    </section>

    <section class="metrics">
      <article>
        <span>К повторению</span>
        <strong>{{ stats().dueNow }}</strong>
      </article>
      <article>
        <span>Новые</span>
        <strong>{{ stats().newCards }}</strong>
      </article>
      <article>
        <span>Освоено</span>
        <strong>{{ stats().mastered }}</strong>
      </article>
      <article>
        <span>Серия</span>
        <strong>{{ stats().streakDays }} дн.</strong>
      </article>
    </section>

    <section class="workbench">
      <div class="review-callout">
        <h2>Очередь повторения</h2>
        <p>Mock-сервис уже рассчитывает dueAt и обновляет карточки после оценки ответа.</p>
        <a routerLink="/review">Перейти к карточкам</a>
      </div>

      <div class="module-list">
        <h2>Активные модули</h2>
        @for (module of modules(); track module.id) {
          <a class="module-row" [routerLink]="['/modules', module.id]">
            <span [style.background]="module.color"></span>
            <strong>{{ module.title }}</strong>
            <small>{{ module.cardsTotal }} карточек</small>
          </a>
        }
      </div>
    </section>
  `,
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage {
  private readonly study = inject(StudyService);

  readonly stats = this.study.stats;
  readonly modules = this.study.allModules;
}
