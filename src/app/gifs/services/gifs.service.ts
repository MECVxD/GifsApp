import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  // Todo cambiar any por su tipo
  public resultados: Gif[] = [];
  private apiKey: string = '';
  private _historial: string[] = [];
  private srvicioUrl: string = 'https://api.giphy.com/v1/gifs/';

  public get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //this._historial  = JSON.parse(localStorage.getItem('historial')!) || [];
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  public buscarGifs(query: string): void {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params: HttpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(
        `${ this.srvicioUrl }/search`, { params })
      .subscribe((response: SearchGifsResponse) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
