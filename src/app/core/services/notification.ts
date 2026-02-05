import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { base_api } from '../../config/api/base-api';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private eventSource?: EventSource;
  private connectedUserId?: string;

  // signal holding latest message
  readonly notification = signal<any | null>(null);
  readonly notifications = signal<any[]>([]);
  readonly unreadCount = signal<number>(0);
constructor(private http: HttpClient) {}
  connect(userId: string) {
    if (this.connectedUserId === userId && this.eventSource) {
      return;
    }

    this.close();
    this.connectedUserId = userId;
    this.eventSource = new EventSource(`${base_api}/notification/get-stream/${userId}`);

    this.eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      this.notification.set(parsed);
      this.notifications.set([parsed, ...this.notifications()]);
      if (parsed?.status === 'UNREAD') {
        this.unreadCount.set(this.unreadCount() + 1);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE disconnected', error);
      this.eventSource?.close();
    };
  }

  send(message: string): Observable<any> {
    return this.http.post(`${base_api}/notification/emit-event`, {
      message: message,
    });
  }

  loadUserNotifications(userId: string): Observable<{ notifications: any[] }> {
    return this.http.get<{ notifications: any[] }>(`${base_api}/notification/user/${userId}`);
  }

  loadUnreadCount(userId: string): Observable<{ unreadCount: number }> {
    return this.http.get<{ unreadCount: number }>(`${base_api}/notification/user/${userId}/unread-count`);
  }

  close() {
    this.eventSource?.close();
    this.eventSource = undefined;
    this.connectedUserId = undefined;
  }

}
