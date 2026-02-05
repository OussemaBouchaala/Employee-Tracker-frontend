import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { User } from '../../../../core/services/auth.service';
import { EditUserModal } from './edit-user-modal/edit-user-modal';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, EditUserModal],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {
  // Using signals for reactive state management
  users = signal<User[]>([]);
  selectedUser = signal<User | null>(null);
  isEditModalOpen = signal(false);
  loading = signal(true);

  // Toast notification signals
  toastMessage = signal('');
  showToast = signal(false);
  toastType = signal<'success' | 'error' | 'info'>('success');

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.userManagementService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
        console.log('Users loaded:', data);
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.loading.set(false);
        this.displayToast('Failed to load users', 'error');
      }
    });
  }

  approveUser(id: string) {
    console.log('Approve user', id);
  }

  deleteUser(id: string) {
    // Show confirmation toast instead of confirm dialog
    const user = this.users().find(u => u.id === id);
    if (!user) return;

    // For now, we'll proceed with deletion directly
    // In a real app, you might want a confirmation modal
    this.userManagementService.deleteUser(id).subscribe({
      next: () => {
        this.displayToast(`User "${user.name}" deleted successfully`, 'success');
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.displayToast('Failed to delete user', 'error');
      }
    });
  }

  openEditModal(user: User) {
    this.selectedUser.set(user);
    this.isEditModalOpen.set(true);
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
    this.selectedUser.set(null);
  }

  onUserUpdated() {
    this.displayToast('User updated successfully', 'success');
    this.loadUsers();
    this.closeEditModal();
  }

  displayToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}
