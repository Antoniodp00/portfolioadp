import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../services/portfolio';
import { Profile } from '../../models/portfolio.models';
import { SeoService } from '../../services/seo.service';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Projects } from '../projects/projects';
import { Experience } from '../experience/experience';
import { Contact } from '../contact/contact';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, MatButtonModule, MatIconModule, About, Skills, Projects, Experience, Contact, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  private svc = inject(PortfolioService);
  private seo = inject(SeoService);
  protected i18n = inject(I18nService);
  profile = signal<Profile | null>(null);
  typedText = signal('');

  private roles = ['Desarrollador en Formación', 'Java & Kotlin Developer', '.NET & Angular 21', 'Apasionado por la IA'];
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;

  ngOnInit() {
    this.svc.getProfile().subscribe(p => {
      this.profile.set(p);
      this.seo.update(p);
    });
    this.typeEffect();
  }

  getSocialIconUrl(icon: string): string {
    const map: Record<string, string> = {
      github:   'https://cdn.simpleicons.org/github',
      linkedin: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg',
      whatsapp: 'https://cdn.simpleicons.org/whatsapp',
    };
    return map[icon] ?? '';
  }

  scrollTo(anchor: string) {
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private typeEffect() {
    const current = this.roles[this.roleIndex];
    if (!this.deleting) {
      this.typedText.set(current.slice(0, ++this.charIndex));
      if (this.charIndex === current.length) {
        this.deleting = true;
        setTimeout(() => this.typeEffect(), 2000);
        return;
      }
    } else {
      this.typedText.set(current.slice(0, --this.charIndex));
      if (this.charIndex === 0) {
        this.deleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
    }
    setTimeout(() => this.typeEffect(), this.deleting ? 60 : 100);
  }
}
