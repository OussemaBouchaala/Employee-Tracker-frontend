import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { JobPostService } from '../../../../core/services/job-post.service';
import { forkJoin } from 'rxjs';

interface Stat {
  title: string;
  value: string;
  change: string;
}

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome implements OnInit {
  // Using signals for reactive state management
  stats = signal<Stat[]>([
    { title: 'Total Users', value: '...', change: '' },
    { title: 'Active Jobs', value: '...', change: '' },
    { title: 'Recruiters', value: '...', change: '' },
    { title: 'Candidates', value: '...', change: '' }
  ]);

  constructor(
    private userService: UserManagementService,
    private jobService: JobPostService
  ) { }

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    forkJoin({
      users: this.userService.getAllUsers(),
      jobs: this.jobService.findAll()
    }).subscribe({
      next: ({ users, jobs }) => {
        const totalUsers = users.length;
        const recruiters = users.filter(u => u.role === 'recruiter').length;
        const candidates = users.filter(u => u.role === 'candidate').length;
        const activeJobs = jobs.length;

        this.stats.set([
          { title: 'Total Users', value: totalUsers.toString(), change: '' },
          { title: 'Active Jobs', value: activeJobs.toString(), change: '' },
          { title: 'Recruiters', value: recruiters.toString(), change: '' },
          { title: 'Candidates', value: candidates.toString(), change: '' }
        ]);
      },
      error: (err) => console.error('Error loading admin stats:', err)
    });
  }
}
