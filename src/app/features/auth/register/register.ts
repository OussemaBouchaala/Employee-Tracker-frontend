import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { RegisterCandidateDto } from '../../../core/models/auth/register-candidate.dto';
import { RegisterRecruiterDto } from '../../../core/models/auth/register-recruiter.dto';

export type UserRole = 'CANDIDATE' | 'RECRUITER';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(
    private auth: Auth,
    private router: Router,
  ) { }
  selectedRole: UserRole = 'CANDIDATE';
  fileName: string = '';
  profilePictureName: string = '';
  cvTouched: boolean = false;

  formData = {
    name: '',
    email: '',
    password: '',
    phoneNumber: null as number | null,
    profilePicture: null as File | null,
    // Recruiter specific
    companyName: '',
    // Candidate specific
    description: '',
    cv: null as File | null
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
      this.formData.cv = input.files[0];
    }
  }

  onProfilePictureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profilePictureName = input.files[0].name;
      this.formData.profilePicture = input.files[0];
    }
  }

  onSubmit(): void {
    const role = this.selectedRole.toLowerCase();

    if (this.selectedRole === 'CANDIDATE') {
      if (!this.formData.cv) {
        return;
      }

      const candidate: RegisterCandidateDto = {
        name: this.formData.name,
        email: this.formData.email,
        password: this.formData.password,
        role: role as any,
        phoneNumber: this.formData.phoneNumber ?? undefined,
        description: this.formData.description,
      };

      this.auth.registerCandidate(candidate, this.formData.cv, this.formData.profilePicture ?? undefined).subscribe({
        next: () => this.router.navigateByUrl('/verify-email'),
        error: (err) => console.error(err),
      });
      return;
    }

    const recruiter: RegisterRecruiterDto = {
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password,
      role: role as any,
      phoneNumber: this.formData.phoneNumber ?? undefined,
      companyName: this.formData.companyName,
    };

    this.auth.registerRecruiter(recruiter).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (err) => console.error(err),
    });
  }
}
