import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Profile } from '../profile/profile';
import { CommonModule } from '@angular/common';
import { Notification } from '../../features/notifications/components/notification/notification';
import { IconComponent } from '../icon/icon';
import { Auth, User } from '../../core/services/auth';
import { Subscription } from 'rxjs';
import { base_api } from '../../config/api/base-api';

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

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    this.authSubscription = this.auth.isLoggedIn$.subscribe(
      (loggedIn) => this.isLoggedIn = loggedIn
    );
    this.userSubscription = this.auth.currentUser$.subscribe(
      (user) => this.currentUser = user
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  getProfileImageUrl(): string {
    const url = this.currentUser?.profilePictureUrl;
    if (!url) return '';
    // If it's already a full URL, return as-is
    if (url.startsWith('http')) return url;
    // If it's a relative path, prepend the backend URL
    return `${base_api}${url}`;
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  toggleNotif() {
    this.isNotificationsVisible = !this.isNotificationsVisible;
  }
}

