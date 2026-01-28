import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-job-management',
  imports: [],
  templateUrl: './job-management.html',
  styleUrl: './job-management.css'
})
export class JobManagement {
  private adminService = inject(AdminService);
  jobs = signal<any[]>([]);

  constructor() {
    this.loadJobs();
  }

  loadJobs() {
    this.adminService.getJobs().subscribe({
      next: (data) => this.jobs.set(data),
      error: (err) => console.error('Failed to fetch jobs', err)
    });
  }

  deleteJob(id: number | string) {
    this.adminService.deleteJob(id).subscribe({
      next: () => this.loadJobs(),
      error: (err) => console.error('Failed to delete job', err)
    });
  }
}
