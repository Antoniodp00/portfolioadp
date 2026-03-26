import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { forkJoin } from 'rxjs';
import { PortfolioService } from '../../services/portfolio';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private svc = inject(PortfolioService);

  stats = signal([
    { label: 'Skills',      icon: 'code',            value: 0, route: '/admin/skills',     color: '#2563eb' },
    { label: 'Proyectos',   icon: 'work',            value: 0, route: '/admin/projects',   color: '#06b6d4' },
    { label: 'Experiencias',icon: 'business_center', value: 0, route: '/admin/experience', color: '#10b981' },
    { label: 'Educación',   icon: 'school',          value: 0, route: '/admin/education',  color: '#f59e0b' },
  ]);

  quickLinks = [
    { label: 'Editar Perfil',    icon: 'person',    route: '/admin/profile' },
    { label: 'Añadir Proyecto',  icon: 'add_circle', route: '/admin/projects' },
    { label: 'Añadir Skill',     icon: 'add_circle', route: '/admin/skills' },
    { label: 'Ver Portfolio',    icon: 'open_in_new', route: '/' },
  ];

  ngOnInit() {
    forkJoin({
      skills:     this.svc.getSkills(),
      projects:   this.svc.getProjects(),
      experience: this.svc.getExperience(),
      education:  this.svc.getEducation(),
    }).subscribe(data => {
      this.stats.update(s => s.map((item, i) => ({
        ...item,
        value: [data.skills.length, data.projects.length, data.experience.length, data.education.length][i]
      })));
    });
  }
}
