import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Profile } from '../profile/profile';
import { CommonModule } from '@angular/common';
import { Notification } from '../../features/notifications/components/notification/notification';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, Profile, CommonModule, Notification, IconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuVisible = false;
  isNotificationsVisible = false;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  toggleNotif() {
    this.isNotificationsVisible = !this.isNotificationsVisible;
  }
}
