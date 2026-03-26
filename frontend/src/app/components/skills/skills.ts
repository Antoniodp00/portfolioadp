import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { PortfolioService } from '../../services/portfolio';
import { Skill } from '../../models/portfolio.models';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, MatChipsModule, AnimateOnScrollDirective, TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements OnInit {
  private svc = inject(PortfolioService);
  skills = signal<Skill[]>([]);
  activeCategory = signal('Todos');

  categories = computed(() => {
    const cats = [...new Set(this.skills().map(s => s.category))];
    return ['Todos', ...cats];
  });

  filtered = computed(() =>
    this.activeCategory() === 'Todos'
      ? this.skills()
      : this.skills().filter(s => s.category === this.activeCategory())
  );

  ngOnInit() {
    this.svc.getSkills().subscribe(s => this.skills.set(s));
  }
}
