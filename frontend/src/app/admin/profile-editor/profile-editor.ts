import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PortfolioService } from '../../services/portfolio';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-profile-editor',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './profile-editor.html',
  styleUrl: './profile-editor.scss',
})
export class ProfileEditor implements OnInit {
  private svc   = inject(PortfolioService);
  private admin = inject(AdminService);
  private fb    = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  saving = signal(false);

  form = this.fb.group({
    name:      ['', Validators.required],
    title:     ['', Validators.required],
    subtitle:  [''],
    bio:       [''],
    email:     ['', [Validators.required, Validators.email]],
    phone:     [''],
    location:  [''],
    avatarUrl: [''],
    socialLinks: this.fb.array([]),
  });

  get socialLinks() { return this.form.get('socialLinks') as FormArray; }

  ngOnInit() {
    this.svc.getProfile().subscribe(p => {
      this.form.patchValue(p);
      p.socialLinks?.forEach(l => this.socialLinks.push(this.fb.group({ platform: l.platform, url: l.url, icon: l.icon })));
    });
  }

  addSocialLink() {
    this.socialLinks.push(this.fb.group({ platform: '', url: '', icon: '' }));
  }

  removeSocialLink(i: number) {
    this.socialLinks.removeAt(i);
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.admin.updateProfile(this.form.value as any).subscribe({
      next: () => { this.snack.open('Perfil guardado', 'OK', { duration: 3000 }); this.saving.set(false); },
      error: () => { this.snack.open('Error al guardar', 'OK', { duration: 3000 }); this.saving.set(false); },
    });
  }
}
