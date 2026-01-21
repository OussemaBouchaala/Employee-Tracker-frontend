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
    this.manageTextsService.updateTexts({
      homeTitle: this.homeTitle,
      homeSubtitle: this.homeSubtitle,
      aboutVision: this.aboutVision,
      aboutMission: this.aboutMission,
      aboutTeam: this.aboutTeam
    });
    alert('Content saved successfully!');
  }
}
