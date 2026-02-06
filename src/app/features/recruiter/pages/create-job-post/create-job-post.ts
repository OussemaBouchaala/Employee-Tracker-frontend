import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { JobPostService, JobPost } from '../../../../core/services/job-post.service';
import { CreateJobPostDto } from '../../../../core/models/job-post/create-job-post.dto';
import { UpdateJobPostDto } from '../../../../core/models/job-post/update-job-post.dto';

@Component({
    selector: 'app-create-job-post',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './create-job-post.html',
    styleUrl: './create-job-post.css'
})
export class CreateJobPost implements OnInit {
    jobPost = signal<CreateJobPostDto>({
        title: '',
        employmentType: 'Full-time',
        requirements: '',
        industries: '',
        jobFunction: '',
        seniorityLevel: 'Entry Level'
    });

    loading = signal(false);
    isEditMode = signal(false);
    jobId = signal<string | null>(null);
    pageLoading = signal(false);

    // Toast notification
    toastMessage = signal('');
    showToast = signal(false);
    toastType = signal<'success' | 'error'>('success');

    employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
    seniorityLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'];

    constructor(
        private jobPostService: JobPostService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        // Check if we're in edit mode by looking for an ID parameter
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode.set(true);
            this.jobId.set(id);
            this.loadJobPost(id);
        }
    }

    loadJobPost(id: string): void {
        this.pageLoading.set(true);
        this.jobPostService.findOne(id).subscribe({
            next: (post: JobPost) => {
                this.jobPost.set({
                    title: post.title,
                    employmentType: post.employmentType,
                    requirements: post.requirements,
                    industries: post.industries,
                    jobFunction: post.jobFunction,
                    seniorityLevel: post.seniorityLevel
                });
                this.pageLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load job post', err);
                this.pageLoading.set(false);
                this.displayToast('Failed to load job post', 'error');
            }
        });
    }

    onSubmit(): void {
        if (this.isEditMode()) {
            this.updateJobPost();
        } else {
            this.createJobPost();
        }
    }

    createJobPost(): void {
        this.loading.set(true);
        this.jobPostService.create(this.jobPost()).subscribe({
            next: (res) => {
                console.log('Job post created', res);
                this.loading.set(false);
                this.router.navigate(['/recruiter/jobs']);
            },
            error: (err) => {
                console.error('Failed to create job post', err);
                this.loading.set(false);
                this.displayToast('Failed to create job post', 'error');
            }
        });
    }

    updateJobPost(): void {
        const id = this.jobId();
        if (!id) return;

        this.loading.set(true);
        const updateData: UpdateJobPostDto = this.jobPost();
        
        this.jobPostService.update(id, updateData).subscribe({
            next: (res) => {
                console.log('Job post updated', res);
                this.loading.set(false);
                this.displayToast('Job post updated successfully!', 'success');
                setTimeout(() => {
                    this.router.navigate(['/recruiter/jobs']);
                }, 1500);
            },
            error: (err) => {
                console.error('Failed to update job post', err);
                this.loading.set(false);
                this.displayToast('Failed to update job post', 'error');
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
