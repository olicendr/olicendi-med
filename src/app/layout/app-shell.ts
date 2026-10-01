import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { StudyService } from '../core/study/study.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <a class="brand" routerLink="/dashboard">
          <span class="brand-mark">O</span>
          <span>
            <strong>Olicendi Med</strong>
            <small>Биохимия</small>
          </span>
        </a>

        <nav class="nav">
          <a routerLink="/dashboard" routerLinkActive="active">Обзор</a>
          <a routerLink="/modules" routerLinkActive="active">Модули</a>
          <a routerLink="/review" routerLinkActive="active">Повторение</a>
          <a routerLink="/stats" routerLinkActive="active">Статистика</a>
        </nav>

        <div class="account">
          <span>{{ userName() }}</span>
          <small>{{ auth.subscription() === 'free' ? 'Free plan' : 'Подписка активна' }}</small>
          <button type="button" (click)="auth.logout()">Выйти</button>
        </div>
      </aside>

      <main class="content">
        <header class="topbar">
          <div>
            <span class="muted">Сегодня к повторению</span>
            <strong>{{ stats().dueNow }} карточек</strong>
          </div>
          <a class="primary-link" routerLink="/review">Начать сессию</a>
        </header>

        <router-outlet />
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-shell.scss'
})
export class AppShell {
  readonly auth = inject(AuthService);
  private readonly study = inject(StudyService);

  readonly stats = this.study.stats;
  readonly userName = computed(() => this.auth.currentUser()?.name ?? 'Студент');
}
