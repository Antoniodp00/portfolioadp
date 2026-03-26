import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Profile } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta  = inject(Meta);
  private title = inject(Title);

  update(profile: Profile) {
    const title = `${profile.name} | ${profile.title}`;
    const desc  = profile.bio.length > 160 ? profile.bio.substring(0, 157) + '...' : profile.bio;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description',        content: desc });
    this.meta.updateTag({ property: 'og:title',       content: title });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:type',        content: 'website' });
    this.meta.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title',       content: title });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    if (profile.avatarUrl) {
      this.meta.updateTag({ property: 'og:image',      content: profile.avatarUrl });
      this.meta.updateTag({ name: 'twitter:image',     content: profile.avatarUrl });
    }
  }
}
