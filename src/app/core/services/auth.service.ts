import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000'; // Match AdminService

  // Signal to track auth state reactively
  currentUser = signal<any | null>(this.getUserFromStorage());

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.setSession(response);
        }
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data); // Adjust endpoint if needed
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  getUser(): any {
    return this.currentUser();
  }

  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    // Assuming authResult contains user info, or decode token if needed. 
    // For now storing the whole result or a dummy user object if backend doesn't return user details directly.
    const user = authResult.user || { name: 'User' }; 
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  private getUserFromStorage(): any | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
