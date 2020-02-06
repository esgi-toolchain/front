import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Skill} from '../../interfaces/Student';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  create(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(environment.api_url + '/skill', skill);
  }
}
