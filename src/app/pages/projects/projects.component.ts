/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  title = 'ProjectsComponent';

  constructor(
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);

    this.blurLoad();
  }

  updateView() {
    console.log(`[${this.title}#updateView]`);

    this.cdr.detectChanges;
    this.app.updateView(this.title);
  }

  async redirectTo(url: any) {
    await this.app.redirectTo(url, this.title);

    this.updateView();
  }

  defaultOrder() { return 0; }

  blurLoad() {
    const cardPictures = document.querySelectorAll('.card-picture');
    console.log(`[${this.title}#blurLoad] cardPictures (${cardPictures.length})`, cardPictures);

    cardPictures.forEach((cardPicture: any) => {
      const img = cardPicture.querySelector('img');

      function loaded() {
        cardPicture.classList.add('loaded');
      }

      if (img.complete) {
        loaded();
      } else {
        img.addEventListener('load', loaded);
      }
    });
  }
}
