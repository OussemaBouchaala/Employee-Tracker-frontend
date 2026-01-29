import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Notification } from '../../features/notifications/components/notification/notification';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, Notification, IconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);
  isMenuVisible = false;
  isNotificationsVisible = false;

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  get user() {
    return this.authService.getUser();
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  
  toggleNotif() {
    this.isNotificationsVisible = !this.isNotificationsVisible;
  }

  logout() {
    this.authService.logout();
    this.isMenuVisible = false;
  }
}
