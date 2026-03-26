import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  year = new Date().getFullYear();

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
