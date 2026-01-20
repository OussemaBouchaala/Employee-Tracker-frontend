import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement {
  users = [
    { id: 1, name: 'John Doe', role: 'Recruiter', status: 'Active', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Candidate', status: 'Active', email: 'jane@example.com' },
    { id: 3, name: 'Bob Wilson', role: 'Recruiter', status: 'Inactive', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', role: 'Candidate', status: 'Active', email: 'alice@example.com' },
    { id: 5, name: 'New Recruiter', role: 'Recruiter', status: 'Pending', email: 'new@example.com' },
  ];

  approveUser(id: number) {
    console.log('Approve user', id);
    // Implement approve logic
  }

  deleteUser(id: number) {
    console.log('Delete user', id);
    // Implement delete logic
  }

  editUser(id: number) {
    console.log('Edit user', id);
    // Implement edit logic
  }
}
