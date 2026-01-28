import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000'; // Assumption based on notification.ts

  // Recruiters
  getRecruiters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/recruiters`);
  }

  approveRecruiter(id: number | string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/aprove-recruiter/${id}`, {});
  }

  rejectRecruiter(id: number | string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/reject-recruiter/${id}`, {});
  }

  deleteRecruiter(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/delete-recruiter/${id}`);
  }

  // Candidates
  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/candidates`);
  }

  deleteCandidate(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-candidate/${id}`);
  }

  // Jobs
  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job-posts`);
  }

  deleteJob(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/job-posts/${id}`);
  }
}
