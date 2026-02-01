import { Component, Signal, WritableSignal } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../core/services/auth';
import { Subscription } from 'rxjs';

@Component({
  imports: [CommonModule],
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.html',
  styleUrls: ['./notification.css'],
})
export class Notification {
  notification!: Signal<any | null>;
  notifications!: WritableSignal<any[]>;
  unreadCount!: WritableSignal<number>;
  private userSub?: Subscription;

  constructor(
    private notificationService: NotificationService,
    private auth: Auth,
  ) {}

  ngOnInit() {
    this.notification = this.notificationService.notification;
    this.notifications = this.notificationService.notifications;
    this.unreadCount = this.notificationService.unreadCount;
    this.userSub = this.auth.currentUser$.subscribe((user) => {
      const userId = user?._id;
      if (!userId) return;

      this.notificationService.loadUserNotifications(userId).subscribe({
        next: (res) => this.notifications.set(res.notifications),
      });
      this.notificationService.loadUnreadCount(userId).subscribe({
        next: (res) => this.unreadCount.set(res.unreadCount),
      });

      this.notificationService.connect(userId);

      this.userSub?.unsubscribe();
      this.userSub = undefined;
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.notificationService.close();
  }
}
