import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IconComponent],
  templateUrl: './auth-navbar.html',
  styleUrl: './auth-navbar.css',
})
export class AuthNavbar {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  
  isMenuVisible = false;

  get user() {
    return this.authService.getUser();
  }

  get notificationCount() {
    return this.notificationService.unreadCount();
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  logout() {
    this.authService.logout();
    this.isMenuVisible = false;
  }
}
