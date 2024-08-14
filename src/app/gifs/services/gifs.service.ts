import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifsList: Gif[] = [];
  private apiKey: string = 'Ddl0uUtWPurw3ugbJoODY4bVc6jZOV6e';
  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if( !localStorage.getItem('history') ) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if( this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params: HttpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe((resp) => {
      this.gifsList = resp.data;
    });
  }
}
