import { Component, inject } from '@angular/core';
import { ManageTextsService } from '../../../../core/services/manage-texts';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected manageTextsService = inject(ManageTextsService);
}
