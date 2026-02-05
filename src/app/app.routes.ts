import { Routes } from '@angular/router';
import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { About } from './features/nav/pages/about/about';
import { AdminHome } from './features/admin/pages/admin-home/admin-home';
import { UserManagement } from './features/admin/pages/user-management/user-management';
import { JobManagement } from './features/admin/pages/job-management/job-management';
import { ContentManagement } from './features/admin/pages/content-management/content-management';
import { Homepage } from './features/nav/pages/homepage/homepage';

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
        component : Homepage    },
    {
        path: 'register',
        component : Register
    },
    {
        path: 'login',
        component : Login
       },
    {
        path: 'about',
        component : About
    },
    {
        path: 'admin',
        component: AdminDashboard,
        children: [
            {
                path: '',
                component : AdminHome            },
            {
                path: 'users',
                component  : UserManagement            },
            {
                path: 'jobs',
                component : JobManagement            },
            {
                path: 'content',
                component : ContentManagement        }
        ]
    }
];
