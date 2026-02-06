import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { base_api } from '../../config/api/base-api';

export interface Recruiter {
  id: string;
  userId: string;
  companyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private readonly apiUrl = `${base_api}/user`;

  constructor(private http: HttpClient) {}

  getRecruiters(): Observable<Recruiter[]> {
    return this.http.get<Recruiter[]>(`${this.apiUrl}/recruiters`);
  }
}
