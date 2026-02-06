import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { JobPostService, JobPost } from '../../../../core/services/job-post.service';

@Component({
  selector: 'app-job-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-post-list.html',
  styleUrl: './job-post-list.css'
})
export class JobPostList implements OnInit {
  jobPosts = signal<JobPost[]>([]);
  loading = signal(true);

  // Delete confirmation modal
  isDeleteModalOpen = signal(false);
  jobToDelete = signal<JobPost | null>(null);

  // Toast notification
  toastMessage = signal('');
  showToast = signal(false);
  toastType = signal<'success' | 'error'>('success');

  constructor(
    private jobPostService: JobPostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobPosts();
  }

  loadJobPosts(): void {
    this.loading.set(true);
    this.jobPostService.findAll().subscribe({
      next: (posts) => {
        this.jobPosts.set(posts);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading job posts:', err);
        this.loading.set(false);
        this.displayToast('Failed to load job posts', 'error');
      }
    });
  }

  editJob(job: JobPost, event: Event): void {
    event.stopPropagation();
    // Navigate to edit page
    this.router.navigate(['/recruiter/jobs', job.id, 'edit']);
  }

  deleteJob(job: JobPost, event: Event): void {
    event.stopPropagation();
    this.jobToDelete.set(job);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen.set(false);
    this.jobToDelete.set(null);
  }

  confirmDelete(): void {
    const job = this.jobToDelete();
    if (!job) return;

    this.jobPostService.delete(job.id).subscribe({
      next: () => {
        this.displayToast(`Job "${job.title}" deleted successfully`, 'success');
        this.loadJobPosts();
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('Error deleting job:', err);
        this.displayToast('Failed to delete job post', 'error');
        this.closeDeleteModal();
      }
    });
  }

  displayToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}
