import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '../../../core/services/auth';
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
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${base_api}${url}`;
  }

  getCvUrl(): string {
    const url = this.user?.candidate?.cv;
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${base_api}/${url}`;
  }

  startEdit() {
    this.editData = {
      name: this.user?.name,
      phoneNumber: this.user?.phoneNumber,
      description: this.user?.candidate?.description,
      companyName: this.user?.recruiter?.companyName
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
}

