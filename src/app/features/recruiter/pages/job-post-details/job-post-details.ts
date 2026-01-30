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
    contactMessage = signal<string>('');
    selectedCandidate = signal<JobPostCandidate | null>(null);
    showContactModal = signal<boolean>(false);
    showToast = signal<boolean>(false);
    toastMessage = signal<string>('');
    toastType = signal<'success' | 'error'>('success');

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

    openContactModal(candidate: JobPostCandidate) {
        this.selectedCandidate.set(candidate);
        this.contactMessage.set('');
        this.showContactModal.set(true);
    }

    closeContactModal() {
        this.showContactModal.set(false);
        this.selectedCandidate.set(null);
        this.contactMessage.set('');
    }

    private openToast(type: 'success' | 'error', message: string) {
        this.toastType.set(type);
        this.toastMessage.set(message);
        this.showToast.set(true);
        setTimeout(() => {
            this.showToast.set(false);
        }, 4000);
    }

    closeToast() {
        this.showToast.set(false);
    }

    sendContactMessage() {
        const candidate = this.selectedCandidate();
        const message = this.contactMessage();
        
        if (!candidate || !message || !this.jobId) return;

        this.jobPostService.contactCandidate(this.jobId, candidate.candidateId, message).subscribe({
            next: (response: any) => {
                console.log('Contact message sent:', response);
                this.closeContactModal();
                this.openToast('success', 'Contact request sent successfully.');
            },
            error: (err: any) => {
                console.error('Failed to send contact message', err);
                this.openToast('error', 'Failed to send contact request. Please try again.');
            }
        });
    }
}
