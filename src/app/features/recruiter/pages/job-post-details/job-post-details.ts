import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JobPostService, JobPost, JobPostCandidate } from '../../../../core/services/job-post.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-job-post-details',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './job-post-details.html',
    styleUrl: './job-post-details.css'
})
export class JobPostDetails implements OnInit {
    jobPost = signal<JobPost | null>(null);
    candidates = signal<JobPostCandidate[]>([]);
    loading = signal<boolean>(true);
    matchingLoading = signal<boolean>(false);
    jobId: string | null = null;
    matchAmount = 5;

    constructor(
        private route: ActivatedRoute,
        private jobPostService: JobPostService
    ) { }

    ngOnInit(): void {
        this.jobId = this.route.snapshot.paramMap.get('id');
        if (this.jobId) {
            this.loadJobPost();
            this.loadCandidates();
        }
    }

    loadJobPost() {
        if (!this.jobId) return;
        this.jobPostService.findOne(this.jobId).subscribe({
            next: (post) => {
                console.log('Job Post Loaded:', post);
                this.jobPost.set(post);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Failed to load job post', err);
                this.loading.set(false);
            }
        });
    }

    loadCandidates() {
        if (!this.jobId) return;
        this.jobPostService.getCandidates(this.jobId).subscribe({
            next: (data) => {
                console.log('Existing candidates loaded:', data);
                this.candidates.set(data);
            },
            error: (err) => console.error('Failed to load candidates', err)
        });
    }

    findMatches() {
        if (!this.jobId) return;
        this.matchingLoading.set(true);
        this.jobPostService.findAndMatchCandidates(this.jobId, this.matchAmount).subscribe({
            next: (newMatches) => {
                console.log('Matches found', newMatches);
                this.matchingLoading.set(false);
                // Refresh candidates list
                this.loadCandidates();
            },
            error: (err) => {
                console.error('Failed to find matches', err);
                this.matchingLoading.set(false);
            }
        });
    }
}
