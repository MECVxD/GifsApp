import { Component } from '@angular/core';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public get historial(): string[] {
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) {}

  public buscar(termino: string): void {
    this.gifsService.buscarGifs(termino);
  }
}
