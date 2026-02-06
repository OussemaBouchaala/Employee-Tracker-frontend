import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { Auth, User } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { base_api } from '../../config/api/base-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit, OnDestroy {
  currentUser = signal<User | null>(null);
  private userSubscription?: Subscription;

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.auth.currentUser$.subscribe(
      user => this.currentUser.set(user)
    );
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  getUserName(): string {
    return this.currentUser()?.name || 'User';
  }

  getUserEmail(): string {
    return this.currentUser()?.email || '';
  }

  getUserAvatar(): string {
    const url = this.currentUser()?.profilePictureUrl;

    if (!url || url.includes('undefined') || url.trim() === '') {
      return '/assets/default-profile.png';
    }

    if (url.startsWith('http')) return url;
    return `${base_api}/${url}`;
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}

