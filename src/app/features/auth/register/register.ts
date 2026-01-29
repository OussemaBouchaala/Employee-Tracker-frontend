import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

export type UserRole = 'CANDIDATE' | 'RECRUITER';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(private auth: AuthService) {}
  selectedRole: UserRole = 'CANDIDATE';
  fileName: string = '';
  profilePictureName: string = '';

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
    const formData = new FormData();
    const roleStr = this.selectedRole.toLowerCase();

    // Append common fields
    formData.append('name', this.formData.name);
    formData.append('email', this.formData.email);
    formData.append('password', this.formData.password);
    formData.append('role', roleStr);

    if (this.formData.phoneNumber) {
      formData.append('phoneNumber', this.formData.phoneNumber.toString());
    }

    if (this.formData.profilePicture) {
      formData.append('profilePicture', this.formData.profilePicture);
    }

    if (this.selectedRole === 'RECRUITER') {
      formData.append('companyName', this.formData.companyName);
    }

    if (this.selectedRole === 'CANDIDATE') {
      formData.append('description', this.formData.description);
      if (this.formData.cv) {
        formData.append('cv', this.formData.cv);
      }
    }

    console.log('FormData entries:', Array.from(formData.entries()));

    this.auth.register(formData, roleStr).subscribe({
      next: (res: any) => {
        console.log('Registration successful', res);
      },
      error: (err: any) => {
        console.error('Registration failed', err);
      }
    });
  }
}
