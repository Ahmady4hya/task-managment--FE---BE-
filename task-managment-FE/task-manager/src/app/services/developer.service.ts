import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer } from '../models/developer.model';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiUrl = 'http://localhost:8080/api/v1/developers';

  constructor(private http: HttpClient) {}

  getAllDevelopers(): Observable<Developer[]> {
    return this.http.get<Developer[]>(this.apiUrl);
  }

  getDeveloperById(id: number): Observable<Developer> {
    return this.http.get<Developer>(`${this.apiUrl}/${id}`);
  }

  createDeveloper(developer: Developer): Observable<Developer> {
    return this.http.post<Developer>(this.apiUrl, developer);
  }

  updateDeveloper(id: number, developer: Developer): Observable<Developer> {
    return this.http.put<Developer>(`${this.apiUrl}/${id}`, developer);
  }

  deleteDeveloper(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignToProject(developerId: number, projectId: number): Observable<Developer> {
    return this.http.put<Developer>(`${this.apiUrl}/${developerId}/assign/${projectId}`, {});
  }

  unassignFromProject(developerId: number): Observable<Developer> {
    return this.http.put<Developer>(`${this.apiUrl}/${developerId}/unassign`, {});
  }

  getDevelopersByProject(projectId: number): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.apiUrl}/project/${projectId}`);
  }
}