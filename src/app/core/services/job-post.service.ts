import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateJobPostDto } from '../models/job-post/create-job-post.dto';
import { UpdateJobPostDto } from '../models/job-post/update-job-post.dto';
import { JOB_POST_API } from '../../config/api/job-post-api';

export interface JobPost {
    id: string;
    title: string;
    employmentType: string;
    requirements: string;
    industries: string;
    jobFunction: string;
    seniorityLevel: string;
    recruiterId: string;
    recruiter?: any;
    jobPostCandidates?: JobPostCandidate[];
}

export interface JobPostCandidate {
    id: string;
    jobPostId: string;
    candidateId: string;
    score: number;
    candidate?: any;
}

@Injectable({
    providedIn: 'root'
})
export class JobPostService {

    constructor(private http: HttpClient) { }

    create(data: CreateJobPostDto): Observable<JobPost> {
        return this.http.post<JobPost>(JOB_POST_API.create, data);
    }

    findAll(): Observable<JobPost[]> {
        return this.http.get<JobPost[]>(JOB_POST_API.findAll);
    }

    findOne(id: string): Observable<JobPost> {
        return this.http.get<JobPost>(JOB_POST_API.findOne(id));
    }

    update(id: string, data: UpdateJobPostDto): Observable<JobPost> {
        return this.http.patch<JobPost>(JOB_POST_API.update(id), data);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(JOB_POST_API.delete(id));
    }

    findAndMatchCandidates(id: string, amount: number = 5): Observable<JobPostCandidate[]> {
        return this.http.post<JobPostCandidate[]>(JOB_POST_API.findAndMatchCandidates(id), { amount });
    }

    getCandidates(id: string): Observable<JobPostCandidate[]> {
        return this.http.get<JobPostCandidate[]>(JOB_POST_API.getCandidates(id));
    }

    addCandidate(jobPostId: string, candidateId: string, score: number): Observable<JobPostCandidate> {
        return this.http.post<JobPostCandidate>(JOB_POST_API.addCandidate(jobPostId), { candidateId, score });
    }

    contactCandidate(jobPostId: string, candidateId: string, message: string): Observable<any> {
        return this.http.post(JOB_POST_API.contactCandidate(jobPostId, candidateId), { message });
    }
}
