import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../section-header.component';
import { CardComponent, CardData } from '../cards.component';
import { CuisineMenuComponent } from './cuisine-menu.component';

@Component({
  selector: 'app-cuisine',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeaderComponent,
    CardComponent,
    CuisineMenuComponent,
  ],
  template: `
    <main
      id="main"
      data-page="rooms"
      class="relative block w-full pt-[65px] pr-[65px] pb-0 pl-[150px] text-black tracking-[1px] box-inherit"
    >
      <app-section-header
        sideImageJp="https://mukayu.com/wp-content/themes/corporate/img/cuisine_jp.svg"
        headerTitle="Cocina Kaiseki Korin"
        conceptText="Kaiseki Korin es un fino restaurante con amplia terraza mirando al Jardin del Bosque donde crecen pinos rojos, membrillos, cerezos, camelias, arces y mas arboles. Elegimos los mejores ingredientes con cuidado de una gran gama de productos locales y creamos platos frescos de temporada para el deleite de nuestros huespedes."
      ></app-section-header>

      <app-card *ngFor="let item of cuisineData" [data]="item"> </app-card>

      <app-cuisine-menu></app-cuisine-menu>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class CuisineComponent {
  cuisineData: CardData[] = [
    {
      id: 'filosofy',
      title: 'Filosofía',
      description:
        'Siguiendo la tradición culinaria omakase de Japón, las cenas servidas en Kaiseki Horin son una muestra de los mejores productos de temporada. Los platos se preparan teniendo en cuenta las necesidades dietéticas y preferencias de cada huésped, utilizando excelentes ingredientes locales. El rasgo distintivo de la ciudad de Kaga desde el punto de vista natural es que dos ríos (Daisyouji e Iburibashi) corren desde la fuente hasta el mar solo por Kaga sin tocar otras ciudades. Fluyen desde el monte Dainichi a 1368m sobre el nivel del mar. Al ser la distancia corta entre origen y estuarios, Kaga posee variados ecosistemas (bosques, lagos, ríos, humedales, arrozales, etc.). Esto lleva a una biodiversidad probada por el hecho de que once especies de aves rapaces (usadas como indicadores ambientales) se hallan en Kaga, el setenta por ciento del país. Esto da variedad de ingredientes frescos de la montaña, lagos y mar.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/cuisine/cuisine_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/cuisine/cuisine_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/cuisine/cuisine_img_03.jpg',
      ],
    },
  ];
}
