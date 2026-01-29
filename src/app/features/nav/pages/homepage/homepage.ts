import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ManageTextsService } from '../../../../core/services/manage-texts';
import { IconComponent } from '../../../../shared/icon/icon';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink, IconComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  protected manageTextsService = inject(ManageTextsService);
}
