import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shell',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
            MatSidenavModule, MatToolbarModule, MatListModule,
            MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  auth = inject(AuthService);
  collapsed = signal(false);

  navItems = [
    { label: 'Dashboard',    icon: 'dashboard',       route: '/admin/dashboard' },
    { label: 'Perfil',       icon: 'person',          route: '/admin/profile' },
    { label: 'Skills',       icon: 'code',            route: '/admin/skills' },
    { label: 'Proyectos',    icon: 'work',            route: '/admin/projects' },
    { label: 'Experiencia',  icon: 'business_center', route: '/admin/experience' },
    { label: 'Educación',    icon: 'school',          route: '/admin/education' },
  ];
}
