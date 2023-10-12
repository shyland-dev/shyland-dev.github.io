/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title = 'AboutComponent';

  expandedCardIndex = '-1';
  cardArray = [
    {
      img: 'assets/imgs/PNGs/dudushy.png',
      name: 'Eduardo "dudushy" Talarico',
      mainRole: 'Founder',
      roles: [
        'Fundador',
        'Co-idealizador'
      ],
      description: 'da ShylandDev, possui vasta experiência no ramo de criação de aplicativos, sites, dentre outras smart solutions para empresas pequeno e médio porte.',
      social: [
        {
          network: 'GitHub',
          url: 'https://github.com/dudushy',
          icon: 'assets/imgs/SVGs/logo-github.svg'
        }
      ],
      formation: [
        'Graduação Superior em Ciências da Computação pela Universidade Paulista',
        'Web Developer (Ionic and Angular)'
      ]
    },
    {
      img: 'assets/imgs/PNGs/natzun.png',
      name: 'Natan "Natzun" Zunfrilli',
      mainRole: 'Co-founder',
      roles: [
        'Co-fundador',
        'Co-idealizador'
      ],
      description: 'da ShylandDev, possui 5 anos de experiência e atuação no ramo do direito imobiliário registral, com desenvolvimento smart solutions para cartórios de Registro de Imóveis. Atuando como Analista de implantação, suporte e desenvolvimento.',
      social: [
        {
          network: 'GitHub',
          url: 'https://github.com/Natzun',
          icon: 'assets/imgs/SVGs/logo-github.svg'
        }
      ],
      formation: [
        'Graduação Superior em Direito pelo Centro Universitário Barão de Mauá',
        'IT Security Specialist (database analysis and cyber attack)',
        'C# Developer'
      ]
    }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);

    console.log(`[${this.title}#ngOnInit] expandedCardIndex`, this.expandedCardIndex);
    console.log(`[${this.title}#ngOnInit] cardArray`, this.cardArray);
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

  expandCard(index) {
    console.log(`[${this.title}#expandCard] index`, index);

    this.expandedCardIndex = index;

    console.log(`[${this.title}#expandCard] expandedCardIndex`, this.expandedCardIndex);
  }
}
