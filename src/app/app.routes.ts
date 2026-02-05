import { Routes } from '@angular/router';
import { Homepage } from './features/nav/pages/homepage/homepage';
import { AdminDashboard } from './features/admin/pages/admin-dashboard/admin-dashboard';
import { AdminHome } from './features/admin/pages/admin-home/admin-home';
import { UserManagement } from './features/admin/pages/user-management/user-management';
import { JobManagement } from './features/admin/pages/job-management/job-management';
import { ContentManagement } from './features/admin/pages/content-management/content-management';
import { Candidate } from './features/auth-home/pages/candidate/candidate';
import { Recruiter } from './features/auth-home/pages/recruiter/recruiter';
import { NotFound } from './features/nav/pages/not-found/not-found';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { VerifyEmail } from './features/auth/verify-email/verify-email';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
      path: '',
      component: Homepage
  },
  {
      path: 'candidate',
      component: Candidate
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
      path: 'admin',
      component: AdminDashboard,
      canActivate: [adminGuard],
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
      path: 'recruiter',
      component: Recruiter,
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
  },
  {
    path : '**',
    component : NotFound
  }
];

