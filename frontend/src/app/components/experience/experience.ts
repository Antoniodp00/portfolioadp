import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { PortfolioService } from '../../services/portfolio';
import { Experience as ExperienceModel, Education } from '../../models/portfolio.models';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, MatIconModule, MatTabsModule, AnimateOnScrollDirective, TranslatePipe],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit {
  private svc = inject(PortfolioService);
  experience = signal<ExperienceModel[]>([]);
  education = signal<Education[]>([]);

  ngOnInit() {
    this.svc.getExperience().subscribe(e => this.experience.set(e));
    this.svc.getEducation().subscribe(e => this.education.set(e));
  }
}
