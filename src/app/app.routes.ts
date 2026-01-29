import { Routes } from '@angular/router';
import { Homepage } from './features/nav/pages/homepage/homepage';
import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';
import { AdminHome } from './features/admin/pages/admin-home/admin-home';
import { UserManagement } from './features/admin/pages/user-management/user-management';
import { JobManagement } from './features/admin/pages/job-management/job-management';
import { ContentManagement } from './features/admin/pages/content-management/content-management';
import { Candidate } from './features/auth-home/pages/candidate/candidate';
import { Recruiter } from './features/auth-home/pages/recruiter/recruiter';
import { Profile } from './features/auth-home/pages/profile/profile';
import { NotFound } from './features/nav/pages/not-found/not-found';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [ 
    {
        path: '',
        component: Homepage
    },
    {
        path: 'register',
        component : Register
    },
       {
        path: 'login',
        component : Login
       },
    
    {
        path: 'candidate',
        component: Candidate
    },
    {
        path: 'recruiter',
        component: Recruiter
    },
    {
        path: 'profile',
        component: Profile
    },
    {
        path: 'admin',
        component: AdminDashboard,
        children: [
            {
                path: '',
                component: AdminHome
            },
            {
                path: 'users',
                component: UserManagement
            },
            {
                path: 'jobs',
                component: JobManagement
            },
            {
                path: 'content',
                component: ContentManagement
            }
        ]
    },
    {
        path: '**',
        component: NotFound
    }
];
