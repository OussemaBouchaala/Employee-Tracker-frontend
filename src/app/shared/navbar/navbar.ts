import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Notification } from '../../features/notifications/components/notification/notification';
import { IconComponent } from '../icon/icon';
import { Auth, User } from '../../core/services/auth';
import { Subscription } from 'rxjs';
import { base_api } from '../../config/api/base-api';
import { NotificationService } from '../../core/services/notification';

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
  isLoggedIn = false;
  currentUser: User | null = null;
  private authSubscription?: Subscription;
  private userSubscription?: Subscription;

  constructor(
    private auth: Auth,
    private notificationService: NotificationService,
  ) { }

  get unreadCount() {
    return this.notificationService.unreadCount;
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.isLoggedIn$.subscribe(
      (loggedIn) => this.isLoggedIn = loggedIn
    );
    this.userSubscription = this.auth.currentUser$.subscribe(
      (user) => {
        this.currentUser = user;
        const userId = user?._id;
        if (userId) {
          this.notificationService.loadUserNotifications(userId).subscribe({
            next: (res) => this.notificationService.notifications.set(res.notifications),
          });
          this.notificationService.loadUnreadCount(userId).subscribe({
            next: (res) => this.notificationService.unreadCount.set(res.unreadCount),
          });
          this.notificationService.connect(userId);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.notificationService.close();
  }

  getProfileImageUrl(): string {
    const url = this.currentUser?.profilePictureUrl;

    // If no profile picture URL, return default
    if (!url || url.includes('undefined') || url.trim() === '') {
      return '/assets/default-profile.png';
    }

    // If it's already a full URL, return as-is
    if (url.startsWith('http')) return url;

    // If it's a relative path, prepend the backend URL
    return `${base_api}${url}`;
  }

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

