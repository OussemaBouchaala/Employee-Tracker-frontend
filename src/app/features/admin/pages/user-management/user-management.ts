import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement {
  private adminService = inject(AdminService);
  users = signal<any[]>([]);

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    // Determine how to display mixed lists. For now, we can fetch both and combine, or just show them.
    // Assuming the user wants to see all users.
    // Let's combine them for now or just start with Recruiters as they have 'Pending' status which is important.
    // Better approach: Let's fetch both and combine them into the 'users' signal.

    // We can use forkJoin but let's keep it simple for now and just fetch them.
    this.adminService.getRecruiters().subscribe(recruiters => {
      console.log("recruiters",recruiters);
      const formattedRecruiters = recruiters.map(r => ({ ...r,role: 'Recruiter'}));

      this.adminService.getCandidates().subscribe(candidates => {
        console.log("candidates",candidates);
        const formattedCandidates = candidates.map(c => ({ ...c,role: 'Candidate', approvalStatus: 'Active'})); // Candidates usually active if they exist
        this.users.set([...formattedRecruiters, ...formattedCandidates]);
        console.log("users",this.users());
      });
    });

  }

  approveRecruiter(id: number | string) {
    this.adminService.approveRecruiter(id).subscribe({
      next: () => {
        console.log('User approved');
        this.loadUsers();
      },
      error: (err) => console.error('Failed to approve user', err)
    });
  }

  rejectRecruiter(id: number | string) {
    this.adminService.rejectRecruiter(id).subscribe({
      next: () => {
        console.log('User rejected');
        this.loadUsers();
      },
      error: (err) => console.error('Failed to reject user', err)
    });
  }

  deleteUser(id: number | string, role: string) {
    if (role === 'Recruiter') {
      this.adminService.deleteRecruiter(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Failed to delete recruiter', err)
      });
    } else if (role === 'Candidate') {
      this.adminService.deleteCandidate(id).subscribe({
         next: () => this.loadUsers(),
         error: (err) => console.error('Failed to delete candidate', err)
      });
    }
  }

  // Edit might be complex depending on backend support, leaving placeholder or simple navigate
  editUser(id: number | string) {
    console.log('Edit user', id);
  }

}
