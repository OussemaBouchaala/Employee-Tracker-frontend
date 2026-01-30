import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}

