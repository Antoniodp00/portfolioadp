import { Injectable, signal } from '@angular/core';
import { Lang, translations } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<Lang>((localStorage.getItem('portfolio-lang') as Lang) ?? 'es');

  t(key: string): string {
    return translations[this.lang()][key] ?? key;
  }

  toggle() {
    this.lang.update(l => {
      const next: Lang = l === 'es' ? 'en' : 'es';
      localStorage.setItem('portfolio-lang', next);
      return next;
    });
  }
}
