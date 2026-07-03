import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of, tap } from 'rxjs';
import { AuthSession, User } from '../models';

const STORAGE_KEY = 'olicendi-med-session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session = signal<AuthSession | null>(this.readSession());

  readonly currentUser = computed(() => this.session()?.user ?? null);
  readonly isAuthenticated = computed(() => !!this.session());
  readonly subscription = computed(() => this.session()?.user.subscription ?? 'free');

  constructor(private readonly router: Router) { }

  login(email: string, _password: string): Observable<AuthSession> {
    const user: User = {
      id: 'user-1',
      name: email.split('@')[0] || 'Студент',
      email,
      subscription: 'free'
    };

    const session: AuthSession = {
      user,
      accessToken: crypto.randomUUID(),
      refreshToken: crypto.randomUUID(),
      expiresAt: this.minutesFromNow(20)
    };

    return of(session).pipe(
      delay(450),
      tap((nextSession) => this.setSession(nextSession))
    );
  }

  refreshSession(): Observable<AuthSession | null> {
    const activeSession = this.session();

    if (!activeSession?.refreshToken) {
      return of(null);
    }

    const refreshed: AuthSession = {
      ...activeSession,
      accessToken: crypto.randomUUID(),
      expiresAt: this.minutesFromNow(20)
    };

    return of(refreshed).pipe(
      tap((nextSession) => this.setSession(nextSession))
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.session.set(null);
    void this.router.navigateByUrl('/login');
  }

  private setSession(session: AuthSession): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.session.set(session);
  }

  private readSession(): AuthSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  private minutesFromNow(minutes: number): string {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date.toISOString();
  }
}
