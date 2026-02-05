
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserManagementService } from '../../../../../core/services/user-management.service';
import { User } from '../../../../../core/services/auth.service';

interface EditedModel {
  name?: string;
  phoneNumber?: string;
  description?: string;
  companyName?: string;
}

@Component({
    selector: 'app-edit-user-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-user-modal.html',
    styleUrls: ['./edit-user-modal.css']
})
export class EditUserModal {
    @Input() isOpen = false;
    @Input() user: User | null = null;
    @Output() closeEvent = new EventEmitter();
    @Output() saveEvent = new EventEmitter();

    editData: EditedModel = {};

    constructor(private userManagementService: UserManagementService) { }

    ngOnChanges() {
        if (this.user) {
            this.editData = {
                name: this.user.name,
                phoneNumber: this.user.phoneNumber
            };
            if (this.user.role === 'candidate') {
                this.editData.description = this.user.description!;
            };
            if (this.user.role === 'recruiter') {
                this.editData.companyName = this.user.companyName!;
            }
        }
    }

    save() {
        if (this.user) {
            this.userManagementService.updateUser(this.user.id, this.editData).subscribe({
                next: () => {
                    this.saveEvent.emit();
                    this.close()
                },
                error: (err) => console.error('Error updating user:', err)
            });
        }
    }

    close() {
        this.closeEvent.emit();
    }
}
