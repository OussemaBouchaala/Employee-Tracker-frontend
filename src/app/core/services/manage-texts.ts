import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageTextsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/content';

  private _homeTitle = signal<string>('Welcome to Our Platform');
  private _homeSubtitle = signal<string>('Your journey to a modern web experience starts here.');
  private _aboutVision = signal<string>('We are dedicated to building the future of web applications.');
  private _aboutMission = signal<string>('Our mission is to provide excellence.');
  private _aboutTeam = signal<string>('Meet our dedicated team of professionals.');

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
