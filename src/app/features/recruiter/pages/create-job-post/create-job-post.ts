import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { JobPostService } from '../../../../core/services/job-post.service';
import { CreateJobPostDto } from '../../../../core/models/job-post/create-job-post.dto';

@Component({
    selector: 'app-create-job-post',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './create-job-post.html',
    styleUrl: './create-job-post.css'
})
export class CreateJobPost {
    jobPost: CreateJobPostDto = {
        title: '',
        employmentType: 'Full-time',
        requirements: '',
        industries: '',
        jobFunction: '',
        seniorityLevel: 'Entry Level'
    };

    loading = false;

    employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
    seniorityLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'];

    constructor(
        private jobPostService: JobPostService,
        private router: Router
    ) { }

    onSubmit() {
        this.loading = true;
        this.jobPostService.create(this.jobPost).subscribe({
            next: (res) => {
                console.log('Job post created', res);
                this.loading = false;
                this.router.navigate(['/recruiter/jobs']);
            },
            error: (err) => {
                console.error('Failed to create job post', err);
                this.loading = false;
                // Ideally show toast here
            }
        });
    }
}
