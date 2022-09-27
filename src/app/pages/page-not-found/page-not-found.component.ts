import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<img src="../../assets/page-not-found.jpg"
               alt="404-page-not-found"
               style=" margin: -2rem 0; margin-left: -3rem; opacity: 85%; width: {{width}}px !important;"
              >`
})
export class PageNotFoundComponent implements OnInit {
  width!: number;

  constructor() { }

  ngOnInit(): void {
    this.width = window.innerWidth;
  }

}
