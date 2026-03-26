import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'dark' | 'light'>(
    (localStorage.getItem('portfolio-theme') as 'dark' | 'light') ?? 'dark'
  );

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('portfolio-theme', t);
    });
  }

  toggle() {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
}
