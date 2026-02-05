
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(Auth);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        const user = authService.getCurrentUser();
        if (user && user.role === 'admin') {
            return true;
        }
        router.navigate(['/']);
        return false;
    }

    router.navigate(['/login']);
    return false;
};
