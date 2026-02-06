import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth.service';
import { LoginDto } from '../../../core/models/auth/login.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  showVerifiedToast = signal(false);
  showErrorToast = signal(false);
  errorMessage = signal('');

  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Check if redirected from email verification
    const verified = this.route.snapshot.queryParamMap.get('verified');
    if (verified === 'true') {
      this.showVerifiedToast.set(true);
      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        this.showVerifiedToast.set(false);
      }, 5000);
    }
  }

  loginObj = signal<LoginDto>({
    email: '',
    password: ''
  });

  isLoading = signal(false);

  onSubmit(): void {
    // Prevent double submit
    if (this.isLoading()) return;

    // Basic validation
    const loginData = this.loginObj();
    if (!loginData.email || !loginData.password) {
      this.showError('Please enter email and password.');
      return;
    }

    this.isLoading.set(true);

    this.auth.login(loginData).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
        // Check if email not verified
        if (err.error?.message?.toLowerCase().includes('not verified') ||
          err.error?.message?.toLowerCase().includes('email not verified')) {
          this.showError('Email not verified. Please check your inbox and verify your email.');
        } else {
          this.showError(err.error?.message || 'Login failed. Please try again.');
        }
      },
    });
  }

  showError(message: string): void {
    this.errorMessage.set(message);
    this.showErrorToast.set(true);
    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      this.showErrorToast.set(false);
    }, 5000);
  }

  closeToast(): void {
    this.showVerifiedToast.set(false);
    this.showErrorToast.set(false);
  }
}


