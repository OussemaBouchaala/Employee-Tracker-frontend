import { Routes } from '@angular/router';
import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [ 
    {
        path: 'register',
        component : Register
    },
       {
        path: 'login',
        component : Login
       },
    {
        path: '',
        loadComponent: () => import('./features/nav/pages/homepage/homepage').then(m => m.Homepage)
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
    }
];
