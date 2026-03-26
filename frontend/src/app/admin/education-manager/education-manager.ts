import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PortfolioService } from '../../services/portfolio';
import { AdminService } from '../../services/admin.service';
import { Education } from '../../models/portfolio.models';

@Component({
  selector: 'app-education-manager',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
            MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule],
  templateUrl: './education-manager.html',
  styleUrl: './education-manager.scss',
})
export class EducationManager implements OnInit {
  private svc   = inject(PortfolioService);
  private admin = inject(AdminService);
  private fb    = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  educations = signal<Education[]>([]);
  editing    = signal<Education | null>(null);
  showForm   = signal(false);

  form = this.fb.group({
    institution: ['', Validators.required],
    degree:      ['', Validators.required],
    field:       ['', Validators.required],
    startDate:   [''],
    endDate:     [''],
    period:      [''],
    description: [''],
  });

  ngOnInit() { this.load(); }
  load() { this.svc.getEducation().subscribe(e => this.educations.set(e)); }

  openNew() { this.editing.set(null); this.form.reset(); this.showForm.set(true); }

  openEdit(e: Education) {
    this.editing.set(e);
    this.form.patchValue(e);
    this.showForm.set(true);
  }

  cancel() { this.showForm.set(false); }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    const data: Education = { ...v as any, period: `${v.startDate} – ${v.endDate}` };
    const op = this.editing()
      ? this.admin.updateEducation(this.editing()!.id as number, data)
      : this.admin.createEducation(data);
    op.subscribe({
      next: () => { this.snack.open('Educación guardada', 'OK', { duration: 2500 }); this.showForm.set(false); this.load(); },
      error: () => this.snack.open('Error al guardar', 'OK', { duration: 2500 }),
    });
  }

  delete(e: Education) {
    if (!confirm(`¿Eliminar "${e.field}" en ${e.institution}?`)) return;
    this.admin.deleteEducation(e.id as number).subscribe(() => { this.snack.open('Eliminado', 'OK', { duration: 2000 }); this.load(); });
  }
}
