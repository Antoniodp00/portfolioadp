import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioService } from '../../services/portfolio';
import { Profile } from '../../models/portfolio.models';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [CommonModule, MatIconModule, MatButtonModule, AnimateOnScrollDirective, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  private svc = inject(PortfolioService);
  profile = signal<Profile | null>(null);

  stats = [
    { value: '18', key: 'about.repos' },
    { value: '3',  key: 'about.titulaciones' },
    { value: '2',  key: 'about.experiencia' },
    { value: '2',  key: 'about.practicas' },
  ];

  ngOnInit() {
    this.svc.getProfile().subscribe(p => this.profile.set(p));
  }
}
