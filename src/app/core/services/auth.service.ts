import { Injectable } from '@angular/core';
import { AUTHENTIFICATION_API } from '../../config/api/authentification-api';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../models/auth/login.dto';
import { RegisterCandidateDto } from '../models/auth/register-candidate.dto';
import { RegisterRecruiterDto } from '../models/auth/register-recruiter.dto';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { base_api } from '../../config/api/base-api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'current_user';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  phoneNumber: string;
  role: string;
  verifiedAt: Date | null;
  cv: string;
  description: string | null;
  companyName: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Fetch profile if token exists but user data is missing
    if (this.hasToken() && !this.getStoredUser()) {
      this.fetchProfile().subscribe();
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
  }

  saveUser(user: User): void {
    console.log('Saving user:', user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  fetchProfile(): Observable<User> {
    console.log('Fetching profile...');
    return this.http.get<User>(AUTHENTIFICATION_API.profile).pipe(
      tap((user) => {
        console.log('Profile fetched:', user);
        this.saveUser(user);
      }),
    );
  }

  updateProfile(data: Partial<User>, file?: File): Observable<User> {
    const id = this.getCurrentUser()?.id;
    if (!id) {
      throw new Error('User ID not found');
    }
    return this.http
      .patch<User>(AUTHENTIFICATION_API.updateProfile(id), data)
      .pipe(tap((user) => this.saveUser(user)));
  }

  registerCandidate(candidate: RegisterCandidateDto, file: File, profilePicture?: File) {
    const formData = new FormData();
    formData.append('cv', file);

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    formData.append('name', candidate.name);
    formData.append('email', candidate.email);
    formData.append('password', candidate.password);
    formData.append('role', candidate.role);
    if (candidate.profilePictureUrl) {
      formData.append('profilePictureUrl', candidate.profilePictureUrl);
    }

    if (candidate.phoneNumber !== undefined && candidate.phoneNumber !== null) {
      formData.append('phoneNumber', candidate.phoneNumber.toString());
    }
    formData.append('description', candidate.description);

    return this.http.post(AUTHENTIFICATION_API.registerCandidate, formData);
  }

  registerRecruiter(recruiter: RegisterRecruiterDto) {
    return this.http.post(AUTHENTIFICATION_API.registerRecruiter, recruiter);
  }

  login(credentials: LoginDto) {
    return this.http.post<{ access_token: string }>(AUTHENTIFICATION_API.login, credentials).pipe(
      tap((response) => {
        console.log('Login response:', response);
        if (response.access_token) {
          this.saveToken(response.access_token);
          console.log('Token saved, fetching profile...');
          // Fetch user profile after login
          this.fetchProfile().subscribe({
            next: (user) => console.log('Profile loaded successfully:', user),
            error: (err) => console.error('Failed to fetch profile:', err),
          });
        }
      }),
    );
  }


  verifyEmail(token: string) {
    return this.http.get(`${AUTHENTIFICATION_API.verifyEmail}?token=${token}`);
  }
}

