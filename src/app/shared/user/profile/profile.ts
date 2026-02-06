import { Component, OnInit, signal } from '@angular/core';
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
  user = signal<User | null>(null);
  isEditing = signal(false);
  editData = signal<any>({});
  profilePictureInput = signal<any>(null);
  cvInput = signal<any>(null);

  // Toast notification
  toastMessage = signal('');
  showToast = signal(false);
  toastType = signal<'success' | 'error'>('success');

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.user.set(user);
      console.log('User profile:', user);
    });

    // Redirect if not logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  getProfileImageUrl(): string {
    const url = this.user()?.profilePictureUrl;
    console.log('Profile picture URL:', url);

    // If no profile picture URL, return default
    if (!url || url.includes('undefined') || url.trim() === '') {
      return '/assets/default-profile.png';
    }

    if (url.startsWith('http')) return url;
    return `${base_api}/${url}`;
  }

  getCvUrl(): string {
    const url = this.user()?.cv;
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${base_api}/${url}`;
  }

  startEdit() {
    this.editData.set({
      name: this.user()?.name,
      phoneNumber: this.user()?.phoneNumber,
      description: this.user()?.description,
      companyName: this.user()?.companyName
    });
    this.isEditing.set(true);
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.editData.set({});
  }

  saveProfile() {
    this.auth.updateProfile(this.editData()).subscribe({
      next: (updatedUser) => {
        // The auth service automatically updates currentUser subject, so this.user will update
        this.isEditing.set(false);
      },
      error: (err) => console.error('Failed to update profile', err)
    });
  }

  triggerProfilePictureUpload() {
    const fileInput = document.getElementById('profilePictureInput') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: any, fileType: 'profilePicture' | 'cv') {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileLabel = fileType === 'profilePicture' ? 'Profile picture' : 'CV';
      
      console.log(`${fileLabel} selected:`, fileName);
      
      const formData = new FormData();
      formData.append(fileType, file);
      
      this.auth.updateProfile(formData as Partial<User>).subscribe({
        next: (user) => {
          console.log(`${fileLabel} updated successfully`, user);
          this.displayToast(`${fileLabel} "${fileName}" updated successfully!`, 'success');
        },
        error: (err) => {
          console.error(`Failed to upload ${fileLabel}`, err);
          this.displayToast(`Failed to update ${fileLabel} "${fileName}"`, 'error');
        }
      });
    }
  }

  triggerCvUpload() {
    console.log('triggerCvUpload called');
    const fileInput = document.getElementById('cvInput') as HTMLInputElement;
    console.log('CV file input element:', fileInput);
    if (fileInput) {
      fileInput.click();
    } else {
      console.error('CV input element not found!');
    }
  }

  displayToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 4000);
  }
}

