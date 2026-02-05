import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { LoginDto } from '../../../core/models/auth/login.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  showVerifiedToast = false;
  showErrorToast = false;
  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Check if redirected from email verification
    const verified = this.route.snapshot.queryParamMap.get('verified');
    if (verified === 'true') {
      this.showVerifiedToast = true;
      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        this.showVerifiedToast = false;
      }, 5000);
    }
  }

  loginObj: LoginDto = {
    email: '',
    password: ''
  };

  isLoading = false;

  onSubmit(): void {
    // Prevent double submit
    if (this.isLoading) return;

    // Basic validation
    if (!this.loginObj.email || !this.loginObj.password) {
      this.showError('Please enter email and password.');
      return;
    }

    this.isLoading = true;

    this.auth.login(this.loginObj).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.isLoading = false;
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
    this.errorMessage = message;
    this.showErrorToast = true;
    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      this.showErrorToast = false;
    }, 5000);
  }

  closeToast(): void {
    this.showVerifiedToast = false;
    this.showErrorToast = false;
  }
}


