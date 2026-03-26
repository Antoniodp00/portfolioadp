import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, Skill, Project, Experience, Education } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http   = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/admin';

  // Profile
  updateProfile(p: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/profile`, p);
  }

  // Skills
  createSkill(s: Skill): Observable<Skill>             { return this.http.post<Skill>(`${this.apiUrl}/skills`, s); }
  updateSkill(id: number, s: Skill): Observable<Skill> { return this.http.put<Skill>(`${this.apiUrl}/skills/${id}`, s); }
  deleteSkill(id: number): Observable<any>             { return this.http.delete(`${this.apiUrl}/skills/${id}`); }

  // Projects
  createProject(p: Project): Observable<Project>              { return this.http.post<Project>(`${this.apiUrl}/projects`, p); }
  updateProject(id: number, p: Project): Observable<Project>  { return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, p); }
  deleteProject(id: number): Observable<any>                  { return this.http.delete(`${this.apiUrl}/projects/${id}`); }

  // Experience
  createExperience(e: Experience): Observable<Experience>             { return this.http.post<Experience>(`${this.apiUrl}/experience`, e); }
  updateExperience(id: number, e: Experience): Observable<Experience> { return this.http.put<Experience>(`${this.apiUrl}/experience/${id}`, e); }
  deleteExperience(id: number): Observable<any>                       { return this.http.delete(`${this.apiUrl}/experience/${id}`); }

  // Education
  createEducation(e: Education): Observable<Education>             { return this.http.post<Education>(`${this.apiUrl}/education`, e); }
  updateEducation(id: number, e: Education): Observable<Education> { return this.http.put<Education>(`${this.apiUrl}/education/${id}`, e); }
  deleteEducation(id: number): Observable<any>                     { return this.http.delete(`${this.apiUrl}/education/${id}`); }
}
