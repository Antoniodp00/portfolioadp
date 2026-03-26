import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PortfolioService } from '../../services/portfolio';
import { AdminService } from '../../services/admin.service';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projects-manager',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
            MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule,
            MatTooltipModule, MatChipsModule],
  templateUrl: './projects-manager.html',
  styleUrl: './projects-manager.scss',
})
export class ProjectsManager implements OnInit {
  private svc   = inject(PortfolioService);
  private admin = inject(AdminService);
  private fb    = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  projects  = signal<Project[]>([]);
  editing   = signal<Project | null>(null);
  showForm  = signal(false);
  techs     = signal<string[]>([]);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  form = this.fb.group({
    title:       ['', Validators.required],
    description: ['', Validators.required],
    category:    ['Full Stack'],
    githubUrl:   [''],
    liveUrl:     [''],
    featured:    [false],
  });

  ngOnInit() { this.load(); }
  load() { this.svc.getProjects().subscribe(p => this.projects.set(p)); }

  openNew() {
    this.editing.set(null);
    this.form.reset({ featured: false, category: 'Full Stack' });
    this.techs.set([]);
    this.showForm.set(true);
  }

  openEdit(p: Project) {
    this.editing.set(p);
    this.form.patchValue(p);
    this.techs.set([...(p.technologies ?? [])]);
    this.showForm.set(true);
  }

  cancel() { this.showForm.set(false); }

  addTech(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) this.techs.update(t => [...t, value]);
    event.chipInput!.clear();
  }

  removeTech(tech: string) { this.techs.update(t => t.filter(x => x !== tech)); }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const data: Project = { ...this.form.value as any, technologies: this.techs() };
    const op = this.editing()
      ? this.admin.updateProject(this.editing()!.id as number, data)
      : this.admin.createProject(data);
    op.subscribe({
      next: () => { this.snack.open('Proyecto guardado', 'OK', { duration: 2500 }); this.showForm.set(false); this.load(); },
      error: () => this.snack.open('Error al guardar', 'OK', { duration: 2500 }),
    });
  }

  delete(p: Project) {
    if (!confirm(`¿Eliminar "${p.title}"?`)) return;
    this.admin.deleteProject(p.id as number).subscribe(() => { this.snack.open('Eliminado', 'OK', { duration: 2000 }); this.load(); });
  }
}
