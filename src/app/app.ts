import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notification } from "./components/notification/notification";
import { Sender } from "./components/sender/sender";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Notification, Sender],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProjectFrontend');
}
