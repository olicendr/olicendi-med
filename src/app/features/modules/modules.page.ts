import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudyService } from '../../core/study/study.service';

@Component({
  selector: 'app-modules-page',
  imports: [RouterLink],
  template: `
    <section class="page-heading">
      <span>Модули</span>
      <h1>Темы биохимии</h1>
    </section>

    <section class="modules-grid">
      @for (module of modules(); track module.id) {
        <a class="module-card" [routerLink]="['/modules', module.id]" [style.borderTopColor]="module.color">
          <h2>{{ module.title }}</h2>
          <p>{{ module.description }}</p>
          <div>
            <span>{{ module.cardsTotal }} карточек</span>
            <span>{{ module.estimatedMinutes }} мин</span>
          </div>
        </a>
      }
    </section>
  `,
  styleUrl: './modules.page.scss'
})
export class ModulesPage {
  private readonly study = inject(StudyService);
  readonly modules = this.study.allModules;
}
