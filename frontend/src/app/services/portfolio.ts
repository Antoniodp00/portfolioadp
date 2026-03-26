import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, switchMap, catchError, of } from 'rxjs';
import { Profile, Skill, Project, Experience, Education, ContactMessage } from '../models/portfolio.models';

interface PortfolioData {
  profile:    Profile;
  skills:     Skill[];
  projects:   Project[];
  experience: Experience[];
  education:  Education[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http  = inject(HttpClient);
  private data$ = this.http.get<PortfolioData>('/assets/data.json').pipe(shareReplay(1));

  getProfile():    Observable<Profile>      { return this.data$.pipe(map(d => d.profile)); }
  getSkills():     Observable<Skill[]>      { return this.data$.pipe(map(d => d.skills)); }
  getProjects():   Observable<Project[]>    { return this.data$.pipe(map(d => d.projects)); }
  getExperience(): Observable<Experience[]> { return this.data$.pipe(map(d => d.experience)); }
  getEducation():  Observable<Education[]>  { return this.data$.pipe(map(d => d.education)); }

  sendContact(msg: ContactMessage): Observable<{ status: string; message: string }> {
    return this.data$.pipe(
      switchMap(d => {
        const id = d.profile.formspreeId;
        if (id && id.trim() !== '') {
          return this.http.post<any>(
            `https://formspree.io/f/${id}`,
            msg,
            { headers: { Accept: 'application/json' } }
          ).pipe(
            map(() => ({ status: 'ok', message: '¡Mensaje enviado correctamente!' })),
            catchError(() => of({ status: 'error', message: 'Error al enviar. Inténtalo de nuevo.' }))
          );
        }
        const subject = encodeURIComponent(msg.subject);
        const body    = encodeURIComponent(`De: ${msg.name} <${msg.email}>\n\n${msg.message}`);
        window.open(`mailto:${d.profile.email}?subject=${subject}&body=${body}`);
        return of({ status: 'ok', message: '¡Abriendo tu cliente de correo!' });
      })
    );
  }
}
