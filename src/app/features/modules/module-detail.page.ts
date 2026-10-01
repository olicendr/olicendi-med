import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { BiochemModule, StudyCard } from '../../core/models';
import { StudyService } from '../../core/study/study.service';

@Component({
  selector: 'app-module-detail-page',
  imports: [RouterLink],
  template: `
    @if (module(); as selectedModule) {
      <section class="module-header" [style.borderLeftColor]="selectedModule.color">
        <a routerLink="/modules">Назад к модулям</a>
        <h1>{{ selectedModule.title }}</h1>
        <p>{{ selectedModule.description }}</p>
      </section>

      <section class="cards-list">
        @for (card of cards(); track card.id) {
          <article>
            <span>{{ card.tags.join(' / ') }}</span>
            <h2>{{ card.front }}</h2>
            <p>{{ card.back }}</p>
            <small>{{ card.clinicalNote }}</small>
          </article>
        }
      </section>
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './module-detail.page.scss'
})
export class ModuleDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly study = inject(StudyService);

  readonly module = signal<BiochemModule | undefined>(undefined);
  readonly cards = signal<StudyCard[]>([]);

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const moduleId = params.get('moduleId') ?? '';
          return forkJoin({
            module: this.study.loadModule(moduleId),
            cards: this.study.loadCardsByModule(moduleId)
          });
        })
      )
      .subscribe(({ module, cards }) => {
        this.module.set(module);
        this.cards.set(cards);
      });
  }
}
