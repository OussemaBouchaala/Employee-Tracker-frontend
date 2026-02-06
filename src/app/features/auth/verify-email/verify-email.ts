import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

type VerifyStatus = 'pending' | 'verifying' | 'success' | 'error' | 'already-verified';

@Component({
    selector: 'app-verify-email',
    imports: [CommonModule, RouterLink],
    templateUrl: './verify-email.html',
    styleUrl: './verify-email.css'
})
export class VerifyEmail implements OnInit {
    token = signal<string | null>(null);
    status = signal<VerifyStatus>('pending');
    successMessage = signal('');
    errorMessage = signal('');
    showErrorToast = signal(false);
    toastErrorMessage = signal('');

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: Auth
    ) { }

    ngOnInit(): void {
        const tokenFromUrl = this.route.snapshot.queryParamMap.get('token');
        this.token.set(tokenFromUrl);

        // Auto-verify if token is present
        if (tokenFromUrl) {
            this.verifyToken();
        }
    }

    verifyToken(): void {
        const tokenValue = this.token();
        if (!tokenValue) {
            this.showError('No verification token provided.');
            return;
        }

        this.status.set('verifying');

        this.auth.verifyEmail(tokenValue).subscribe({
            next: (response: any) => {
                this.status.set('success');
                this.successMessage.set(response.message || 'Email verified successfully!');

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
                this.errorMessage.set(err.error.message);
            }
        });
    }

    showError(message: string): void {
        this.status.set('error');
        this.toastErrorMessage.set(message);
        this.showErrorToast.set(true);
        this.errorMessage.set(message);

        // Auto-hide toast after 5 seconds
        setTimeout(() => {
            this.showErrorToast.set(false);
        }, 5000);
    }

    closeToast(): void {
        this.showErrorToast.set(false);
    }

    goToLogin(): void {
        this.router.navigate(['/login'], { queryParams: { verified: 'true' } });
    }
}



