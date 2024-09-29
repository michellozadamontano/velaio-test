import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkill } from '../models/skill.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl: string = 'api/skills';

  constructor(private http: HttpClient) { }

  /**
   * Returns an observable of a list of all skills
   * @returns {Observable<ISkill[]>}
   */
  getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(this.apiUrl);
  }

  createSkill(skill: ISkill): Observable<ISkill> {
    return this.http.post<ISkill>(this.apiUrl, skill);
  }

  deleteSkill(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
