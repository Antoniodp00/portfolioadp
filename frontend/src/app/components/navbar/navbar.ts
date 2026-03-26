import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  themeService = inject(ThemeService);
  i18nService = inject(I18nService);
  scrolled = signal(false);
  menuOpen = signal(false);

  navLinks = [
    { key: 'nav.inicio',      anchor: '#hero' },
    { key: 'nav.sobreMi',     anchor: '#about' },
    { key: 'nav.skills',      anchor: '#skills' },
    { key: 'nav.proyectos',   anchor: '#projects' },
    { key: 'nav.experiencia', anchor: '#experience' },
    { key: 'nav.contacto',    anchor: '#contact' },
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 50); }

  scrollTo(anchor: string) {
    const el = document.querySelector(anchor);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuOpen.set(false);
  }
}
