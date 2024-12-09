import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bars',
  templateUrl: './search-bars.component.html',
  styleUrls: ['./search-bars.component.css']
})
export class SearchBarsComponent {

  constructor() { }

  gotoAdmin() {
    window.location.href = '/admin';
  }

}
