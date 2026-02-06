import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth.service';
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
  selectedRole = signal<UserRole>('CANDIDATE');
  fileName = signal('');
  profilePictureName = signal('');
  cvTouched = signal(false);

  formData = signal({
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
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const current = this.formData();
      this.fileName.set(input.files[0].name);
      this.formData.set({
        ...current,
        cv: input.files[0]
      });
    }
  }

  onProfilePictureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const current = this.formData();
      this.profilePictureName.set(input.files[0].name);
      this.formData.set({
        ...current,
        profilePicture: input.files[0]
      });
    }
  }

  onSubmit(): void {
    const role = this.selectedRole().toLowerCase();
    const data = this.formData();

    if (this.selectedRole() === 'CANDIDATE') {
      if (!data.cv) {
        return;
      }

      const candidate: RegisterCandidateDto = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: role as any,
        phoneNumber: data.phoneNumber ?? undefined,
        description: data.description,
      };

      this.auth.registerCandidate(candidate, data.cv, data.profilePicture ?? undefined).subscribe({
        next: () => this.router.navigateByUrl('/verify-email'),
        error: (err) => console.error(err),
      });
      return;
    }

    const recruiter: RegisterRecruiterDto = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: role as any,
      phoneNumber: data.phoneNumber ?? undefined,
      companyName: data.companyName,
    };

    this.auth.registerRecruiter(recruiter).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (err) => console.error(err),
    });
  }
}
