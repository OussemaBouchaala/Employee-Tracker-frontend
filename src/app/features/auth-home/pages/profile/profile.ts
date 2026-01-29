import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthNavbar } from '../../../../shared/auth-navbar/auth-navbar';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthNavbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private authService = inject(AuthService);

  isEditing = false;
  isDarkTheme = true;

  // Editable user data
  userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 555 123 4567',
    location: 'New York, USA',
    bio: 'Passionate developer with 5+ years of experience in web technologies.',
    avatar: ''
  };

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    // Call API to save profile
    console.log('Saving profile:', this.userData);
    this.isEditing = false;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
  }
}
