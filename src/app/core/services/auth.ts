import { Injectable } from '@angular/core';
import { AUTHENTIFICATION_API } from '../../config/api/authentification-api';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../models/auth/login.dto';
import { RegisterCandidateDto } from '../models/auth/register-candidate.dto';
import { RegisterRecruiterDto } from '../models/auth/register-recruiter.dto';
  


@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private http: HttpClient) { }

  registerCandidate(candidate: RegisterCandidateDto, file: File) {
    const formData = new FormData();
    formData.append('cv', file);

    formData.append('name', candidate.name);
    formData.append('email', candidate.email);
    formData.append('password', candidate.password);
    formData.append('role', candidate.role);
    formData.append('profilePictureUrl', candidate.profilePictureUrl);
    formData.append('phoneNumber', candidate.phoneNumber);
    formData.append('description', candidate.description);

    return this.http.post(AUTHENTIFICATION_API.registerCandidate, formData);
  }

  registerRecruiter(recruiter: RegisterRecruiterDto) {
    return this.http.post(AUTHENTIFICATION_API.registerRecruiter, recruiter);
  }

  login(credentials: LoginDto) {
    return this.http.post(AUTHENTIFICATION_API.login, credentials);
  }

  verifyEmail(token: string) {
    return this.http.get(`${AUTHENTIFICATION_API.verifyEmail}/${token}`);
  }

}
