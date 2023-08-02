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

    this.window.onresize = () => {
      console.log(`[${this.title}#window.onresize]`);

      this.setupRainbowCanvas();
    };

    this.window.onload = () => {
      console.log(`[${this.title}#window.onload]`);

      this.setupRainbowCanvas();
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

  setupRainbowCanvas() {
    console.log(`[${this.title}#setupRainbowCanvas]`);

    const canvas = document.getElementById('rainbowCanvas') as HTMLCanvasElement;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const font = 'arial';
    const fontSize = 10;
    context.font = fontSize + 'px ' + font;
    const cols = canvas.width / fontSize;

    const charSet = 'SHYLAND'.split('');

    const drops = [];
    for (let col = 0; col < cols; col++) {
      drops[col] = Math.floor(Math.random() * canvas.height);
    }

    const randdomColor = () => {
      return 'rgb(' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ')';
    };

    const rain = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let col = 0; col < drops.length; col++) {
        const char = charSet[Math.floor(Math.random() * charSet.length)];
        context.fillStyle = randdomColor();
        context.fillText(char, col * fontSize, drops[col] * fontSize);

        if (Math.random() > 0.99) {
          drops[col] = 0;
        }

        drops[col]++;
      }
    };

    setInterval(rain, 25);
  }
}
