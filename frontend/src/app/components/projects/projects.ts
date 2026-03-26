import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { PortfolioService } from '../../services/portfolio';
import { Project } from '../../models/portfolio.models';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatChipsModule, AnimateOnScrollDirective, TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private svc = inject(PortfolioService);
  projects = signal<Project[]>([]);
  activeFilter = signal('Todos');
  showAll = signal(false);

  categories = computed(() => {
    const cats = [...new Set(this.projects().map(p => p.category))];
    return ['Todos', ...cats];
  });

  filtered = computed(() => {
    const list = this.activeFilter() === 'Todos'
      ? this.projects()
      : this.projects().filter(p => p.category === this.activeFilter());
    return this.showAll() ? list : list.slice(0, 6);
  });

  ngOnInit() {
    this.svc.getProjects().subscribe(p => this.projects.set(p));
  }
}
