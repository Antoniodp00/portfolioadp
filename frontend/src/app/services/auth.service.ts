import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface LoginResponse { token: string; username: string; expiresIn: number; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8080/api/auth';

  isLoggedIn = signal(this.hasToken());

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('admin_token', res.token);
        localStorage.setItem('admin_user',  res.username);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    this.isLoggedIn.set(false);
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null { return localStorage.getItem('admin_token'); }
  getUsername(): string     { return localStorage.getItem('admin_user') ?? 'Admin'; }
  hasToken(): boolean       { return !!localStorage.getItem('admin_token'); }
}
