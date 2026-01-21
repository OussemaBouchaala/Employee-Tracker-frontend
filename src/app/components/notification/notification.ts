import { Component, Signal } from '@angular/core';
import { NotificationService } from '../../services/notification';
import { JsonPipe } from '@angular/common';
@Component({
imports: [JsonPipe],
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.html',
  styleUrls: ['./notification.css'],
})
export class Notification {
  notification!: Signal<any | null>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notification = this.notificationService.notification;
    this.notificationService.connect();
  }

  ngOnDestroy() {
    this.notificationService.close();
  }
}
