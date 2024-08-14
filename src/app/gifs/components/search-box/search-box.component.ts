import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

// import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor( private gifService: GifsService) {}

  public searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}