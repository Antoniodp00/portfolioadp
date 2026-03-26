import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PortfolioService } from '../../services/portfolio';
import { AdminService } from '../../services/admin.service';
import { Skill } from '../../models/portfolio.models';

@Component({
  selector: 'app-skills-manager',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
            MatButtonModule, MatIconModule, MatSnackBarModule, MatSelectModule,
            MatSliderModule, MatDialogModule],
  templateUrl: './skills-manager.html',
  styleUrl: './skills-manager.scss',
})
export class SkillsManager implements OnInit {
  private svc   = inject(PortfolioService);
  private admin = inject(AdminService);
  private fb    = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  skills   = signal<Skill[]>([]);
  editing  = signal<Skill | null>(null);
  showForm = signal(false);

  categories = ['Backend','Frontend','DevOps','Database','Tools','Cloud','Mobile','Other'];

  form = this.fb.group({
    name:     ['', Validators.required],
    category: ['', Validators.required],
    level:    [80, [Validators.required, Validators.min(0), Validators.max(100)]],
    icon:     [''],
  });

  ngOnInit() { this.load(); }
  load() { this.svc.getSkills().subscribe(s => this.skills.set(s)); }

  openNew() { this.editing.set(null); this.form.reset({ level: 80 }); this.showForm.set(true); }

  openEdit(s: Skill) {
    this.editing.set(s);
    this.form.patchValue(s);
    this.showForm.set(true);
  }

  cancel() { this.showForm.set(false); }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const data = this.form.value as Skill;
    const op = this.editing()
      ? this.admin.updateSkill(this.editing()!.id as number, data)
      : this.admin.createSkill(data);
    op.subscribe({
      next: () => { this.snack.open('Skill guardado', 'OK', { duration: 2500 }); this.showForm.set(false); this.load(); },
      error: () => this.snack.open('Error al guardar', 'OK', { duration: 2500 }),
    });
  }

  delete(s: Skill) {
    if (!confirm(`¿Eliminar "${s.name}"?`)) return;
    this.admin.deleteSkill(s.id as number).subscribe(() => { this.snack.open('Eliminado', 'OK', { duration: 2000 }); this.load(); });
  }
}
