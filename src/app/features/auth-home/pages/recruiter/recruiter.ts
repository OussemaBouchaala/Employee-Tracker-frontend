import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthNavbar } from '../../../../shared/auth-navbar/auth-navbar';

@Component({
  selector: 'app-recruiter',
  standalone: true,
  imports: [CommonModule, RouterLink, AuthNavbar],
  templateUrl: './recruiter.html',
  styleUrl: './recruiter.css',
})
export class Recruiter implements OnInit {
  // Mock data - replace with service calls
  jobPosts = [
    { id: 1, title: 'Senior Frontend Developer', applicants: 45, matchRate: 78, status: 'active' },
    { id: 2, title: 'Backend Engineer', applicants: 32, matchRate: 85, status: 'active' },
    { id: 3, title: 'DevOps Specialist', applicants: 18, matchRate: 62, status: 'paused' },
    { id: 4, title: 'Product Manager', applicants: 56, matchRate: 71, status: 'active' },
  ];

  topCandidates = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', matchRate: 95, avatar: '' },
    { id: 2, name: 'Bob Smith', role: 'Full Stack', matchRate: 92, avatar: '' },
    { id: 3, name: 'Carol Davis', role: 'UI Designer', matchRate: 89, avatar: '' },
  ];

  stats = {
    totalPosts: 12,
    totalApplicants: 151,
    hiredThisMonth: 3,
    avgMatchRate: 74
  };

  tips = [
    { icon: '🎯', title: 'Be Specific', description: 'Clearly define required skills and experience levels.' },
    { icon: '💰', title: 'Show Salary Range', description: 'Posts with salary info get 30% more applicants.' },
    { icon: '🏢', title: 'Highlight Culture', description: 'Describe your team and work environment.' },
    { icon: '⚡', title: 'Respond Quickly', description: 'Top candidates are off the market in 10 days.' },
  ];

  ngOnInit() {
    // Fetch data from services
  }
}
