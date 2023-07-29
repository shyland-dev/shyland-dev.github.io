/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { DbService } from './services/db/db.service';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppComponent';

  allPages: any = [];

  window = window;

  theme = 'dark';

  mobileMode = false;

  constructor(
    public db: DbService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    public location: Location
  ) {
    console.log(`[${this.title}#constructor]`);

    const rawAllPages = this.router.config;
    console.log(`[${this.title}#constructor] rawAllPages`, rawAllPages);

    this.allPages = rawAllPages.filter((page: any) => {
      return page.path !== '' && page.path !== '**';
    });

    console.log(`[${this.title}#constructor] allPages`, this.allPages);

    this.redirectTo(this.db.get('last_page') || '', this.title);

    this.theme = this.db.get('theme') || 'dark';
    this.toggleTheme(this.theme);

    this.toggleMobileMode();

    this.window.onresize = () => {
      console.log(`[${this.title}#window.onresize]`);

      this.toggleMobileMode();
    };

    this.window.onload = () => {
      console.log(`[${this.title}#window.onload]`);
    };
  }

  updateView(from: string) {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  async redirectTo(url: any, from: any) {
    console.log(`[${this.title}#redirectTo] ${from} | url`, [url]);

    // { skipLocationChange: true }
    await this.router.navigateByUrl(`/${url}`);

    if (url == '' || url == 'home') this.window.history.pushState({}, '', '/');

    this.db.set('last_page', url);
    console.log(`[${this.title}#redirectTo] last_page`, [this.db.get('last_page')]);

    this.updateView(this.title);
  }

  defaultOrder() { return 0; }

  toggleTheme(theme: any) {
    console.log(`[${this.title}#toggleTheme] theme`, theme);

    this.theme = theme;
    this.db.set('theme', theme);

    document.documentElement.setAttribute('theme', theme);
    document.documentElement.style.setProperty('--theme', theme);

    this.updateView(this.title);
  }

  toggleMobileMode() {
    const width = window.innerWidth;
    const condition = width < 900;
    console.log(`[${this.title}#toggleMobileMode] width`, width, condition);

    if (condition) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }

    this.updateView(this.title);
  }
}
