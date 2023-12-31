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

  galleryIndex = 0;
  projectArray: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);

    this.projectArray = [
      {
        title: 'Project 1',
        description: 'This is a sample description.\nA test, just a test.',
        image: 'assets/imgs/JPGs/project1_sample.jpg',
        image_small: 'assets/imgs/JPGs/project1_sample-small.jpg',
        src: 'https://shyland-dev.github.io/temp/'
      },
      {
        title: 'jk-caminhao',
        description: 'AUTO SOCORRO GUINCHO CAMINHAO EM RIBEIRAO PRETO, CRAVINHOS E REGIAO',
        image: 'assets/imgs/PNGs/jk_caminhao.png',
        image_small: 'assets/imgs/PNGs/jk_caminhao-small.png',
        src: 'https://jk-caminhao-autosocorro-guincho.com/'
      },
      {
        title: 'crisalidas',
        description: 'Artesanato em PVC: Luminárias, Brindes, Troféus, Placas Decorativas e Chaveiros.',
        image: 'assets/imgs/PNGs/crisalidas.png',
        image_small: 'assets/imgs/PNGs/crisalidas-small.png',
        src: 'https://shyland-dev.github.io/crisalidas/'
      },
      {
        title: 'Project 4',
        description: 'test.',
        image: 'assets/imgs/JPGs/project4_sample.jpg',
        image_small: 'assets/imgs/JPGs/project4_sample-small.jpg',
        src: 'https://shyland-dev.github.io/temp/'
      },
      {
        title: 'Project 5',
        description: 'THIS IS A TEST',
        image: 'assets/imgs/JPGs/project5_sample.jpg',
        image_small: 'assets/imgs/JPGs/project5_sample-small.jpg',
        src: 'https://shyland-dev.github.io/temp/'
      },
      {
        title: 'Project 6',
        description: '1234567890',
        image: 'assets/imgs/JPGs/project6_sample.jpg',
        image_small: 'assets/imgs/JPGs/project6_sample-small.jpg',
        src: 'https://shyland-dev.github.io/temp/'
      },
      {
        title: 'Project 7',
        description: '',
        image: 'assets/imgs/JPGs/project7_sample.jpg',
        image_small: 'assets/imgs/JPGs/project7_sample-small.jpg',
        src: 'https://shyland-dev.github.io/temp/'
      },
      {
        title: 'Project 8',
        description: 'This is a sample description.\nA test, just a test.\nThis is a longer description.\nAnother test, more tests.',
        image: 'assets/imgs/JPGs/project8_sample.jpg',
        image_small: 'assets/imgs/JPGs/project8_sample-small.jpg',
        src: 'https://shyland-dev.github.io/temp/'
      }
    ];
    console.log(`[${this.title}#ngOnInit] projectArray`, this.projectArray);
  }

  ngAfterViewInit() {
    console.log(`[${this.title}#ngAfterViewInit]`);

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

  openGallery(index) {
    console.log(`[${this.title}#openGallery] index`, index);

    this.galleryIndex = parseInt(index);

    const gallery = document.getElementById('gallery');
    console.log(`[${this.title}#openGallery] gallery`, gallery);

    gallery.classList.add('open');

    const iframe = document.getElementById('gallery-iframe') as HTMLIFrameElement;
    console.log(`[${this.title}#openGallery] iframe`, iframe);

    this.blurIframe();
    iframe.setAttribute('src', this.projectArray[index].src);
  }

  closeGallery() {
    console.log(`[${this.title}#closeGallery]`);

    const gallery = document.getElementById('gallery');
    console.log(`[${this.title}#openGallery] gallery`, gallery);

    gallery.classList.remove('open');
  }

  prevGalleryItem() {
    console.log(`[${this.title}#prevGalleryItem] (BEFORE) galleryIndex`, this.galleryIndex);

    if (this.galleryIndex - 1 < 0) return;

    this.galleryIndex = this.galleryIndex - 1;

    console.log(`[${this.title}#prevGalleryItem] (AFTER) galleryIndex`, this.galleryIndex);

    const iframe = document.getElementById('gallery-iframe') as HTMLIFrameElement;
    console.log(`[${this.title}#openGallery] iframe`, iframe);

    this.blurIframe();
    iframe.setAttribute('src', this.projectArray[this.galleryIndex].src);
  }

  nextGalleryItem() {
    console.log(`[${this.title}#nextGalleryItem] (BEFORE) galleryIndex`, this.galleryIndex);

    if (this.galleryIndex + 1 > this.projectArray.length - 1) return;

    this.galleryIndex = this.galleryIndex + 1;

    console.log(`[${this.title}#nextGalleryItem] (AFTER) galleryIndex`, this.galleryIndex);

    const iframe = document.getElementById('gallery-iframe') as HTMLIFrameElement;
    console.log(`[${this.title}#openGallery] iframe`, iframe);

    this.blurIframe();
    iframe.setAttribute('src', this.projectArray[this.galleryIndex].src);
  }

  blurIframe() {
    console.log(`[${this.title}#unblurIframe]`);

    const iframeWrapper = document.getElementById('iframe-wrapper');
    console.log(`[${this.title}#unblurIframe] iframeWrapper`, iframeWrapper);

    const iframe = document.getElementById('gallery-iframe') as HTMLIFrameElement;
    console.log(`[${this.title}#unblurIframe] iframe`, iframe);

    iframeWrapper.classList.add('blur');
    iframe.classList.add('blur');
  }

  unblurIframe() {
    console.log(`[${this.title}#unblurIframe]`);

    const iframeWrapper = document.getElementById('iframe-wrapper');
    console.log(`[${this.title}#unblurIframe] iframeWrapper`, iframeWrapper);

    const iframe = document.getElementById('gallery-iframe') as HTMLIFrameElement;
    console.log(`[${this.title}#unblurIframe] iframe`, iframe);

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      console.log(`[${this.title}#unblurIframe] iframeDoc`, iframeDoc);

      if (iframeDoc.readyState == 'complete') {
        iframe.contentWindow.onload = function () {
          iframe.classList.remove('blur');
        };
      } else {
        window.setTimeout(this.unblurIframe, 100);
      }
    } catch (error) {
      iframeWrapper.classList.remove('blur');
      iframe.classList.remove('blur');
    }
  }
}
