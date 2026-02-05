import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManageTextsService } from '../../../../core/services/manage-texts';

@Component({
  selector: 'app-content-management',
  imports: [FormsModule],
  templateUrl: './content-management.html',
  styleUrl: './content-management.css'
})
export class ContentManagement {
  private manageTextsService = inject(ManageTextsService);

  homeTitle = this.manageTextsService.homeTitle();
  homeSubtitle = this.manageTextsService.homeSubtitle();
  aboutVision = this.manageTextsService.aboutVision();
  aboutMission = this.manageTextsService.aboutMission();
  aboutTeam = this.manageTextsService.aboutTeam();

  saveContent() {
    const updates = {
      homeTitle: this.homeTitle,
      homeSubtitle: this.homeSubtitle,
      aboutVision: this.aboutVision,
      aboutMission: this.aboutMission,
      aboutTeam: this.aboutTeam
    };
    
    this.manageTextsService.saveTexts(updates).subscribe({
      next: () => alert('Content saved successfully!'),
      error: (err) => {
        console.error('Failed to save content', err);
        alert('Failed to save content.');
      }
    });
  }
}

