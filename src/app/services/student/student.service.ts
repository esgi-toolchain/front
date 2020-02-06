import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../interfaces/Student';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.api_url + '/student');
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(environment.api_url + '/student/' + id);
  }
}
