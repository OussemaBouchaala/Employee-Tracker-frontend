import { Routes } from '@angular/router';
import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { VerifyEmail } from './features/auth/verify-email/verify-email';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/nav/pages/homepage/homepage').then(m => m.Homepage)
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'verify-email',
        component: VerifyEmail
    },
    {
        path: 'profile',
        loadComponent: () => import('./shared/user/profile/profile').then(m => m.UserProfile)
    },
    {
        path: 'about',
        loadComponent: () => import('./features/nav/pages/about/about').then(m => m.About)
    },
    {
        path: 'admin',
        component: AdminDashboard,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/admin/pages/admin-home/admin-home').then(m => m.AdminHome)
            },
            {
                path: 'users',
                loadComponent: () => import('./features/admin/pages/user-management/user-management').then(m => m.UserManagement)
            },
            {
                path: 'jobs',
                loadComponent: () => import('./features/admin/pages/job-management/job-management').then(m => m.JobManagement)
            },
            {
                path: 'content',
                loadComponent: () => import('./features/admin/pages/content-management/content-management').then(m => m.ContentManagement)
            }
        ]
    },
    {
        path: 'recruiter',
        children: [
            {
                path: 'jobs',
                loadComponent: () => import('./features/recruiter/pages/job-post-list/job-post-list').then(m => m.JobPostList)
            },
            {
                path: 'jobs/create',
                loadComponent: () => import('./features/recruiter/pages/create-job-post/create-job-post').then(m => m.CreateJobPost)
            },
            {
                path: 'jobs/:id',
                loadComponent: () => import('./features/recruiter/pages/job-post-details/job-post-details').then(m => m.JobPostDetails)
            }
        ]
    }
];

