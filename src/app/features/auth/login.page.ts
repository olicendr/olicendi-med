import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  template: `
    <main class="login-page">
      <section class="login-panel">
        <div class="intro">
          <span class="brand-mark">O</span>
          <h1>Olicendi Med</h1>
          <p>Карточки по биохимии с интервальным повторением для студентов-медиков.</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            Email
            <input type="email" formControlName="email" autocomplete="email" />
          </label>

          <label>
            Пароль
            <input type="password" formControlName="password" autocomplete="current-password" />
          </label>

          @if (error()) {
            <p class="error">{{ error() }}</p>
          }

          <button type="submit" [disabled]="form.invalid || loading()">
            {{ loading() ? 'Входим...' : 'Войти' }}
          </button>
        </form>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './login.page.scss'
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({
    email: ['student@olicendi.local', [Validators.required, Validators.email]],
    password: ['demo-password', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
    if (this.form.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.form.controls.email.value, this.form.controls.password.value).subscribe({
      next: () => void this.router.navigateByUrl('/dashboard'),
      error: () => {
        this.error.set('Не удалось войти. Попробуйте еще раз.');
        this.loading.set(false);
      }
    });
  }
}
