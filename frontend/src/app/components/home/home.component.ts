import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { IntroComponent } from './intro.component';
import { FeatureCardComponent } from './feature-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, IntroComponent, FeatureCardComponent],
  template: `
    <app-hero></app-hero>

    <main
      class="w-full bg-[#f7f7f5] pt-[60px] md:pt-[130px] md:pr-[65px] md:pb-0 md:pl-[150px]"
    >
      <app-intro></app-intro>
      <div class="flex flex-col w-full mt-12 md:mt-24">
        @for (feature of features; track feature.imageJpUrl) {
          <app-feature-card
            [imageSpUrl]="feature.imageSpUrl"
            [imageJpUrl]="feature.imageJpUrl"
            [titleHorizontal]="feature.titleHorizontal"
            [imageUrl]="feature.imageUrl"
            [link]="feature.link"
            [topOffset]="feature.topOffset"
          >
          </app-feature-card>
        }
      </div>
    </main>
  `,
})
export class HomeComponent {
  features = [
    {
      imageSpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/rooms_sp.svg',
      imageJpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/rooms_jp.svg',
      titleHorizontal: 'habitaciones',
      imageUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/index/rooms_img.jpg',
      link: '/habitaciones',
      topOffset: 100,
    },
    {
      imageSpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/facilities_sp.svg',
      imageJpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/facilities_jp.svg',
      titleHorizontal: 'instalaciones',
      imageUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/index/facilities_img.jpg',
      link: '/instalaciones',
      topOffset: 100,
    },
    {
      imageSpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/cuisine_sp.svg',
      imageJpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/cuisine_jp.svg',
      titleHorizontal: 'cocina kaiseki horin',
      imageUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/index/cuisine_img.jpg',
      link: '/cocina',
      topOffset: 195,
    },
    {
      imageSpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/spa_sp.svg',
      imageJpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/spa_jp.svg',
      titleHorizontal: 'spa entei',
      imageUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/index/spa_img.jpg',
      link: '/spa',
      topOffset: 200,
    },
    {
      imageSpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/amenity_sp.svg',
      imageJpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/amenity_jp.svg',
      titleHorizontal: 'amenidades',
      imageUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/index/amenity_img.jpg',
      link: '/amenidades',
      topOffset: 200,
    },
    {
      imageSpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/experience_sp.svg',
      imageJpUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/experience_jp.svg',
      titleHorizontal: 'experiencias privadas',
      imageUrl:
        'https://mukayu.com/wp-content/themes/corporate/img/index/experience_img.jpg',
      link: '/experiencias',
      topOffset: 250,
    },
  ];
}
