import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPostService, JobPost, JobPostCandidate } from '../../../../core/services/job-post.service';

@Component({
  selector: 'app-job-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-management.html',
  styleUrl: './job-management.css'
})
export class JobManagement implements OnInit {
  // Using signals for reactive state management
  jobs = signal<JobPost[]>([]);
  loading = signal(true);
  selectedJob = signal<JobPost | null>(null);
  showDetailsModal = signal(false);
  matchedCandidates = signal<JobPostCandidate[]>([]);
  loadingCandidates = signal(false);
  toastMessage = signal('');
  showToast = signal(false);

  constructor(private jobPostService: JobPostService) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.loading.set(true);
    this.jobPostService.findAll().subscribe({
      next: (data) => {
        this.jobs.set(data);
        this.loading.set(false);
        console.log('Jobs loaded:', data);
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
        this.loading.set(false);
        this.showToastMessage('Error loading jobs. Please try again.');
      }
    });
  }

  viewJobDetails(job: JobPost) {
    this.selectedJob.set(job);
    this.showDetailsModal.set(true);
    this.loadMatchedCandidates(job.id);
  }

  loadMatchedCandidates(jobId: string) {
    this.loadingCandidates.set(true);
    this.jobPostService.getCandidates(jobId).subscribe({
      next: (candidates) => {
        this.matchedCandidates.set(candidates);
        this.loadingCandidates.set(false);
      },
      error: (err) => {
        console.error('Error loading candidates:', err);
        this.loadingCandidates.set(false);
        this.matchedCandidates.set([]);
      }
    });
  }

  closeModal() {
    this.showDetailsModal.set(false);
    this.selectedJob.set(null);
    this.matchedCandidates.set([]);
  }

  deleteJob(id: string) {
    if (confirm('Are you sure you want to delete this job post?')) {
      this.jobPostService.delete(id).subscribe({
        next: () => {
          this.showToastMessage('Job post deleted successfully!');
          this.loadJobs();
        },
        error: (err) => {
          console.error('Error deleting job:', err);
          this.showToastMessage('Error deleting job post. Please try again.');
        }
      });
    }
  }

  showToastMessage(message: string) {
    this.toastMessage.set(message);
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}
