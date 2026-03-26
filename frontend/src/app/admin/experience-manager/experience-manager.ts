import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PortfolioService } from '../../services/portfolio';
import { AdminService } from '../../services/admin.service';
import { Experience } from '../../models/portfolio.models';

@Component({
  selector: 'app-experience-manager',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
            MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule],
  templateUrl: './experience-manager.html',
  styleUrl: './experience-manager.scss',
})
export class ExperienceManager implements OnInit {
  private svc   = inject(PortfolioService);
  private admin = inject(AdminService);
  private fb    = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  experiences = signal<Experience[]>([]);
  editing     = signal<Experience | null>(null);
  showForm    = signal(false);

  form = this.fb.group({
    company:     ['', Validators.required],
    role:        ['', Validators.required],
    startDate:   ['', Validators.required],
    endDate:     [''],
    period:      [''],
    current:     [false],
    description: [''],
    companyUrl:  [''],
    achievements: this.fb.array([]),
  });

  get achievements() { return this.form.get('achievements') as FormArray; }

  ngOnInit() { this.load(); }
  load() { this.svc.getExperience().subscribe(e => this.experiences.set(e)); }

  openNew() {
    this.editing.set(null);
    this.form.reset({ current: false });
    while (this.achievements.length) this.achievements.removeAt(0);
    this.showForm.set(true);
  }

  openEdit(e: Experience) {
    this.editing.set(e);
    while (this.achievements.length) this.achievements.removeAt(0);
    this.form.patchValue(e);
    e.achievements?.forEach(a => this.achievements.push(this.fb.control(a)));
    this.showForm.set(true);
  }

  addAchievement() { this.achievements.push(this.fb.control('')); }
  removeAchievement(i: number) { this.achievements.removeAt(i); }
  cancel() { this.showForm.set(false); }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    const data: Experience = {
      ...v as any,
      period: `${v.startDate} – ${v.current ? 'Presente' : v.endDate}`,
      achievements: this.achievements.value,
    };
    const op = this.editing()
      ? this.admin.updateExperience(this.editing()!.id as number, data)
      : this.admin.createExperience(data);
    op.subscribe({
      next: () => { this.snack.open('Experiencia guardada', 'OK', { duration: 2500 }); this.showForm.set(false); this.load(); },
      error: () => this.snack.open('Error al guardar', 'OK', { duration: 2500 }),
    });
  }

  delete(e: Experience) {
    if (!confirm(`¿Eliminar "${e.role}" en ${e.company}?`)) return;
    this.admin.deleteExperience(e.id as number).subscribe(() => { this.snack.open('Eliminado', 'OK', { duration: 2000 }); this.load(); });
  }
}
