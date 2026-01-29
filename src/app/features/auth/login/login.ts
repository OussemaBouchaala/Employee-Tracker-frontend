import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;
    const credentials = { email: this.email, password: this.password };
    console.log('Login attempt with:', credentials);
    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('Login successful', res);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Login failed', err);
        this.errorMessage = err?.error?.message || 'Login failed. Check credentials.';
      }
    });
  }

}
