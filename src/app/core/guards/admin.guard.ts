import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(Auth);
    const router = inject(Router);

    // Check if user is logged in
    if (authService.isLoggedIn()) {
        const user = authService.getCurrentUser();
        
        // Only allow if user has admin role
        if (user && user.role === 'admin') {
            return true;
        }
    }

    // For non-admin users or not logged in users,
    // navigate to a non-existent route to trigger the wildcard (NotFound) route
    // This makes the admin route appear as if it doesn't exist
    router.navigate(['/page-not-found'], { skipLocationChange: true });
    return false;
};
