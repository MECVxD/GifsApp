import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor( private gifsService: GifsService ) {}

  public get gifs(): Gif[] {
    return this.gifsService.gifsList;
  }
}