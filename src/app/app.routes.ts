import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LoginPage } from './features/auth/login.page';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { ModuleDetailPage } from './features/modules/module-detail.page';
import { ModulesPage } from './features/modules/modules.page';
import { ReviewPage } from './features/review/review.page';
import { StatsPage } from './features/stats/stats.page';
import { AppShell } from './layout/app-shell';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: '',
    component: AppShell,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardPage },
      { path: 'modules', component: ModulesPage },
      { path: 'modules/:moduleId', component: ModuleDetailPage },
      { path: 'review', component: ReviewPage },
      { path: 'stats', component: StatsPage },
    ],
  },
  { path: '**', redirectTo: '' },
];
