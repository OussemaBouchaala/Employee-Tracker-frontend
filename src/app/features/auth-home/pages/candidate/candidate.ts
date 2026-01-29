import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthNavbar } from '../../../../shared/auth-navbar/auth-navbar';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule, RouterLink, AuthNavbar],
  templateUrl: './candidate.html',
  styleUrl: './candidate.css',
})
export class Candidate implements OnInit {
  // Mock data - replace with service calls
  recentJobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', matchRate: 92 },
    { id: 2, title: 'Full Stack Engineer', company: 'StartupX', location: 'New York', matchRate: 87 },
    { id: 3, title: 'UI/UX Designer', company: 'DesignHub', location: 'San Francisco', matchRate: 78 },
    { id: 4, title: 'React Developer', company: 'WebFlow', location: 'London', matchRate: 85 },
  ];

  stats = {
    totalJobs: 156,
    applications: 12,
    interviews: 3,
    profileViews: 45
  };

  cvTips = [
    { icon: '📝', title: 'Keep it Concise', description: 'Aim for 1-2 pages. Recruiters spend ~6 seconds scanning.' },
    { icon: '🎯', title: 'Tailor Your CV', description: 'Customize for each role using keywords from the job description.' },
    { icon: '📊', title: 'Quantify Achievements', description: 'Use numbers: "Increased sales by 25%" beats "Improved sales".' },
    { icon: '✨', title: 'Update Regularly', description: 'Add new skills and projects to stay competitive.' },
  ];

  ngOnInit() {
    // Fetch data from services here
  }
}
