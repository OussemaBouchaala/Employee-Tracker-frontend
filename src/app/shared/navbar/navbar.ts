import { Component, OnInit, OnDestroy, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Profile } from '../profilenav/profile';
import { CommonModule } from '@angular/common';
import { Notification } from '../../features/notifications/components/notification/notification';
import { IconComponent } from '../icon/icon';
import { Auth, User } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { base_api } from '../../config/api/base-api';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, Profile, CommonModule, Notification, IconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  isMenuVisible = false;
  isNotificationsVisible = false;
  isLoggedIn = false;
  currentUser: User | null = null;
  private authSubscription?: Subscription;
  private userSubscription?: Subscription;
  profileImgUrl: WritableSignal<string> = signal('');
  constructor(
    private auth: Auth,
    private notificationService: NotificationService,
  ) {}

  get unreadCount() {
    return this.notificationService.unreadCount;
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.isLoggedIn$.subscribe(
      (loggedIn) => (this.isLoggedIn = loggedIn),
    );
    this.userSubscription = this.auth.currentUser$.subscribe((user) => {
      this.currentUser = user;
      console.log('Current user:', user);
      const userId = user?.id;
      if (userId) {
        this.notificationService.loadUserNotifications(userId).subscribe({
          next: (res) => this.notificationService.notifications.set(res.notifications),
        });
        this.notificationService.loadUnreadCount(userId).subscribe({
          next: (res) => this.notificationService.unreadCount.set(res.unreadCount),
        });
        this.notificationService.connect(userId);
      }
      const image = this.getProfileImageUrl();
      this.profileImgUrl.set(image);
    });
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
    return `${base_api}/${url}`;
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  toggleNotif() {
    this.isNotificationsVisible = !this.isNotificationsVisible;
  }
}
