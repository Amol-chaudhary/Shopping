import { Component } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoading = true;
  constructor() {
  }

  

  ngOnInit(): void {
    const big = document.querySelector('.carousel');
    M.Carousel.init(big, { indicators: true });
  }

  title = 'fish';
}
