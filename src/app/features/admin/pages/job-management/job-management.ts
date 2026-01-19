import { Component } from '@angular/core';

@Component({
  selector: 'app-job-management',
  imports: [],
  templateUrl: './job-management.html',
  styleUrl: './job-management.css'
})
export class JobManagement {
  jobs = [
    { id: 1, title: 'Senior Frontend Developer', company: 'Tech Corp', postedBy: 'John Doe', status: 'Pending', date: '2023-10-25' },
    { id: 2, title: 'UX Designer', company: 'Design Studio', postedBy: 'Bob Wilson', status: 'Approved', date: '2023-10-24' },
    { id: 3, title: 'Backend Engineer', company: 'Cloud Systems', postedBy: 'John Doe', status: 'Rejected', date: '2023-10-23' },
  ];

  approveJob(id: number) {
    console.log('Approve job', id);
    // Implement approve logic
  }

  rejectJob(id: number) {
    console.log('Reject job', id);
    // Implement reject logic
  }

  deleteJob(id: number) {
    console.log('Delete job', id);
    // Implement delete logic
  }
}
