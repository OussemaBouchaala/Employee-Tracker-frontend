import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notification } from "./features/notifications/components/notification/notification";
import { Sender } from "./features/notifications/components/sender/sender";
import { Navbar } from './features/nav/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Notification, Sender],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Job Matcher' );
}
