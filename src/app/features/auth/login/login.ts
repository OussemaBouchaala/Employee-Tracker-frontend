import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { LoginDto } from '../../../core/models/auth/login.dto';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  loginObj: LoginDto = {
    email: '',
    password: ''
  };

  onSubmit(): void {
    this.auth.login(this.loginObj).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.error(err),
    });
  }
}
