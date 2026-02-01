import { Component, inject, OnInit, signal } from '@angular/core';
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
  // private recruiterService = inject(RecruiterService);

  // recruiters = signal<Recruiter[]>([]);
  // loadingRecruiters = signal<boolean>(true);

  // ngOnInit() {
  //   this.loadRecruiters();
  // }

  // private loadRecruiters() {
  //   this.recruiterService.getRecruiters().subscribe({
  //     next: (recruiters) => {
  //       this.recruiters.set(recruiters);
  //       this.loadingRecruiters.set(false);
  //     },
  //     error: (error) => {
  //       console.error('Error loading recruiters:', error);
  //       this.loadingRecruiters.set(false);
  //     }
  //   });
  // }
}
