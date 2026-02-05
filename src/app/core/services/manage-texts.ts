import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageTextsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/content';

  private _homeTitle = signal<string>('Find Your Perfect Career Match');
  private _homeSubtitle = signal<string>('Connect with top recruiters and discover opportunities that align with your skills and aspirations.');
  private _aboutVision = signal<string>('To bridge the gap between talented professionals and innovative companies, creating meaningful career connections that drive success for both candidates and organizations.');
  private _aboutMission = signal<string>('We are committed to revolutionizing the recruitment process by leveraging cutting-edge technology and personalized matching algorithms. Our platform ensures that every job seeker finds their ideal role and every company discovers their perfect candidate.');
  private _aboutTeam = signal<string>('Our diverse team brings together expertise from technology, human resources, and recruitment industries. We are passionate about creating transformative career experiences and building lasting professional relationships.');

  readonly homeTitle = this._homeTitle.asReadonly();
  readonly homeSubtitle = this._homeSubtitle.asReadonly();
  readonly aboutVision = this._aboutVision.asReadonly();
  readonly aboutMission = this._aboutMission.asReadonly();
  readonly aboutTeam = this._aboutTeam.asReadonly();

  constructor() {
    this.fetchTexts();
  }

  fetchTexts() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        if (data) {
          if (data.homeTitle) this._homeTitle.set(data.homeTitle);
          if (data.homeSubtitle) this._homeSubtitle.set(data.homeSubtitle);
          if (data.aboutVision) this._aboutVision.set(data.aboutVision);
          if (data.aboutMission) this._aboutMission.set(data.aboutMission);
          if (data.aboutTeam) this._aboutTeam.set(data.aboutTeam);
        }
      },
      error: (err) => console.error('Failed to fetch texts', err)
    });
  }

  saveTexts(texts: any) {
    return this.http.put(this.apiUrl, texts).pipe(
      tap(() => this.updateTexts(texts))
    );
  }

  updateTexts(updates: Partial<{ homeTitle:  string; homeSubtitle: string; aboutVision: string; aboutMission: string; aboutTeam: string }>): void {
    if (updates.homeTitle !== undefined) this._homeTitle.set(updates.homeTitle);
    if (updates.homeSubtitle !== undefined) this._homeSubtitle.set(updates.homeSubtitle);
    if (updates.aboutVision !== undefined) this._aboutVision.set(updates.aboutVision);
    if (updates.aboutMission !== undefined) this._aboutMission.set(updates.aboutMission);
    if (updates.aboutTeam !== undefined) this._aboutTeam.set(updates.aboutTeam);
  }

  setHomeTitle(value: string): void {
    this._homeTitle.set(value);
  }

  setHomeSubtitle(value: string): void {
    this._homeSubtitle.set(value);
  }

  setAboutVision(value: string): void {
    this._aboutVision.set(value);
  }

  setAboutMission(value: string): void {
    this._aboutMission.set(value);
  }

  setAboutTeam(value: string): void {
    this._aboutTeam.set(value);
  }
}
