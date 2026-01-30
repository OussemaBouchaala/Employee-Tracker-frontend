import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobPostService, JobPost } from '../../../../core/services/job-post.service';

@Component({
    selector: 'app-job-post-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './job-post-list.html',
    styleUrl: './job-post-list.css'
})
export class JobPostList implements OnInit {
    jobPosts = signal<JobPost[]>([]);
    loading = signal<boolean>(true);

    constructor(private jobPostService: JobPostService) { }

    ngOnInit(): void {
        this.jobPostService.findAll().subscribe({
            next: (posts) => {
                this.jobPosts.set(posts);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Failed to fetch job posts', err);
                this.loading.set(false);
            }
        });
    }
}
