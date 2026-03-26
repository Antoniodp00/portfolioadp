import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PortfolioService } from '../../services/portfolio';
import { Profile } from '../../models/portfolio.models';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, AnimateOnScrollDirective, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  private svc = inject(PortfolioService);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  profile = signal<Profile | null>(null);
  sending = signal(false);

  form = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  getSocialIconUrl(icon: string): string {
    const map: Record<string, string> = {
      github:   'https://cdn.simpleicons.org/github',
      linkedin: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg',
      whatsapp: 'https://cdn.simpleicons.org/whatsapp',
    };
    return map[icon] ?? '';
  }

  ngOnInit() {
    this.svc.getProfile().subscribe(p => this.profile.set(p));
  }

  send() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.sending.set(true);
    this.svc.sendContact(this.form.value as any).subscribe({
      next: (res) => {
        this.snack.open(res.message, 'OK', { duration: 5000, panelClass: 'snack-success' });
        this.form.reset();
        this.sending.set(false);
      },
      error: () => {
        this.snack.open('Error al enviar. Inténtalo de nuevo.', 'OK', { duration: 4000 });
        this.sending.set(false);
      }
    });
  }
}
