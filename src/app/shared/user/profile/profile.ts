import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { base_api } from '../../../config/api/base-api';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class UserProfile implements OnInit {
  user: User | null = null;
  isEditing = false;
  editData: any = {};
  profilePictureInput: any;
  cvInput: any;

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.user = user;
      console.log('User profile:', user);
    });

    // Redirect if not logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  getProfileImageUrl(): string {
    const url = this.user?.profilePictureUrl;
    console.log('Profile picture URL:', url);

    // If no profile picture URL, return default
    if (!url || url.includes('undefined') || url.trim() === '') {
      return '/assets/default-profile.png';
    }

    if (url.startsWith('http')) return url;
    return `${base_api}/${url}`;
  }

  getCvUrl(): string {
    const url = this.user?.cv;
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${base_api}/${url}`;
  }

  startEdit() {
    this.editData = {
      name: this.user?.name,
      phoneNumber: this.user?.phoneNumber,
      description: this.user?.description,
      companyName: this.user?.companyName
    };
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editData = {};
  }

  saveProfile() {
    this.auth.updateProfile(this.editData).subscribe({
      next: (updatedUser) => {
        // The auth service automatically updates currentUser subject, so this.user will update
        this.isEditing = false;
      },
      error: (err) => console.error('Failed to update profile', err)
    });
  }

  triggerProfilePictureUpload() {
    const fileInput = document.getElementById('profilePictureInput') as HTMLInputElement;
    fileInput?.click();
  }

  onProfilePictureSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // You can add profile picture upload logic here
      console.log('Profile picture selected in file:', file.name);
      // Dummy API call for profile picture upload
      const formData = new FormData();
      formData.append('profilePicture', file);
      console.log('formData prepared for upload:', Array.from(formData.entries()));
      this.auth.updateProfile(formData as any).subscribe({
        next: (user) => {
          console.log('Profile picture updated successfully', user);
        },
        error: (err) => console.error('Failed to upload profile picture', err)
      });
    }
    console.log('Profile picture selected:', file.name);
    // Call your auth service method to upload the profile picture

  }

  triggerCvUpload() {
    const fileInput = document.getElementById('cvInput') as HTMLInputElement;
    fileInput?.click();
  }

  onCvSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // You can add CV upload logic here
      console.log('CV selected:', file.name);
      // Call your auth service method to upload the CV
      // this.auth.uploadCv(file).subscribe(...);
    }
  }
}

