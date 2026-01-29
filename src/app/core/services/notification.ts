import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private eventSource?: EventSource;

  // signal holding latest message
  readonly notification = signal<any | null>(null);
constructor(private http: HttpClient) {}
  connect() {
    this.eventSource = new EventSource(
      'http://localhost:3000/notification/stream'
    );

    this.eventSource.onmessage = (event) => {
      this.notification.set(JSON.parse(event.data));
console.log('Received SSE message:', event.data );
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE disconnected', error);
      this.eventSource?.close();
    };
  }

  send(message: string): Observable<any> {
    return this.http.post("http://127.0.0.1:3000/notification/emit-event", {
      message: message,
    });
  }

  close() {
    this.eventSource?.close();
  }

  unreadCount() {
    return this.notification().unreadCount;
  }
}
