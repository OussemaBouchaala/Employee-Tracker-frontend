import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';

type VerifyStatus = 'pending' | 'verifying' | 'success' | 'error' | 'already-verified';

@Component({
    selector: 'app-verify-email',
    imports: [CommonModule, RouterLink],
    templateUrl: './verify-email.html',
    styleUrl: './verify-email.css'
})
export class VerifyEmail implements OnInit {
    token: string | null = null;
    status = signal<VerifyStatus>('pending');
    successMessage: string = '';
    errorMessage: string = '';
    showErrorToast: boolean = false;
    toastErrorMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: Auth
    ) { }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('token');

        // Auto-verify if token is present
        if (this.token) {
            this.verifyToken();
        }
    }

    verifyToken(): void {
        if (!this.token) {
            this.showError('No verification token provided.');
            return;
        }

        this.status.set('verifying');

        this.auth.verifyEmail(this.token).subscribe({
            next: (response: any) => {
                this.status.set('success');
                this.successMessage = response.message || 'Email verified successfully!';

                // Auto-redirect to login after 3 seconds with verified flag
                setTimeout(() => {
                    this.router.navigate(['/login'], { queryParams: { verified: 'true' } });
                }, 3000);
            },
            error: (err) => {
                console.log(err);
                console.log(err.error.statusCode);
                // Token not found in database
                this.status.set('error');
                this.errorMessage = err.error.message;
            }
        });
    }

    showError(message: string): void {
        this.status.set('error');
        this.toastErrorMessage = message;
        this.showErrorToast = true;
        this.errorMessage = message;

        // Auto-hide toast after 5 seconds
        setTimeout(() => {
            this.showErrorToast = false;
        }, 5000);
    }

    closeToast(): void {
        this.showErrorToast = false;
    }

    goToLogin(): void {
        this.router.navigate(['/login'], { queryParams: { verified: 'true' } });
    }
}



