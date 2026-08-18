import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../section-header.component';
import { AnchorNavComponent, AnchorItem } from '../anchor-nav.component';
import { FacilityCardComponent, Facility } from './facility-card.component';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [
    CommonModule,
    AnchorNavComponent,
    SectionHeaderComponent,
    FacilityCardComponent,
  ],
  template: ` <main
    id="main"
    data-page="rooms"
    class="relative block w-full pt-[65px] pr-[65px] pb-0 pl-[150px] text-black tracking-[1px] box-inherit"
  >
    <app-anchor-nav [items]="anchorList"></app-anchor-nav>

    <app-section-header
      sideImageJp="https://mukayu.com/wp-content/themes/corporate/img/facilities_jp.svg"
      headerTitle="Instalaciones"
      conceptText="Miyabi se encuentra en la ladera de Yakushiyama (Montaña del Buda de la Curación), sagrada para el culto del Monte Hakusan. En este lugar existió el Templo Yakuoin, donde monjes estudiaban escrituras budistas y sanaban personas usando aguas termales y hierbas medicinales. Como tributo a la historia local, Miyabi ofrece tres bibliotecas para estudiar o leer, dos baños comunes para disfrutar de aguas termales y el Spa Entei ofrece tratamientos modernos basados en hierbas medicinales y termalismo."
    ></app-section-header>

    <div class="mt-[100px]">
      <app-facility-card *ngFor="let item of facilitiesData" [facility]="item">
      </app-facility-card>
    </div>
  </main>`,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class FacilitiesComponent {
  anchorList: AnchorItem[] = [
    { id: 'entrance', label: 'Entrada' },
    { id: 'forest', label: 'Jardín del Bosque' },
    { id: 'onsen', label: 'Baños Comunales Onsen' },
    { id: 'library', label: 'Bibliotecas' },
    { id: 'kaiseki', label: 'Restaurante Kaiseki' },
    { id: 'spa', label: 'Spa Entei' },
  ];

  facilitiesData: Facility[] = [
    {
      id: 'entrance',
      title: 'Entrada',
      description:
        'El ryokan se sitúa al final de una pendiente estrecha que viene desde el pueblo de Yamashiro Onsen. Tras pasar el verde sendero, el ingreso abre a un amplio vestíbulo. El sol brillando entre árboles y la brisa suave moviendo las ramas crean un encantador juego de luces y sombras sobre el suelo, hecho de tierra de diatomeas local. Los huéspedes son atraídos desde el ingreso hacia la terraza y al interior del Jardín del Bosque.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/lob_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/lob_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/lob_img_03.jpg',
      ],
    },
    {
      id: 'forest',
      title: 'Jardín del Bosque',
      description:
        'El sagrado pino rojo Akamatsu de trescientos años es el árbol símbolo del Jardín del Bosque. Árboles grandes como cerezo de montaña, membrillos, camelias japonesas y muchos otros extienden sus ramas libremente, reflejando el cambio de estaciones. Uno de los placeres del Jardín del Bosque es admirar la gran variedad de musgos que prosperan allí.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/gar_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/gar_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/gar_img_03.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/gar_img_04.jpg',
      ],
    },
    {
      id: 'onsen',
      title: 'Baños Comunales Onsen',
      description:
        'Mukayu tiene dos baños comunes: GENSEI, un baño para la meditación pacífica que incluye un respaldo redondo dentro de la bañera; USUKO, baño hecho de madera de ciprés blanco para purificar el cuerpo y la mente. Cada baño común ofrece un baño interior, un baño al aire libre y sauna. Están a disposición de los huéspedes, divididos por géneros. Con más de mil trescientos años de historia, la fuente del renombrado Yamashiro Onsen posee mucha concentración de calcio, sodio y sulfato que no solo mejora la circulación sanguínea y alivia la fatiga por efecto térmico, sino que mejora el estado físico y dermatológico.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/bath_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/bath_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/bath_img_03.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/bath_img_04.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/bath_img_05.jpg',
      ],
    },
    {
      id: 'library',
      title: 'Bibliotecas',
      description:
        'Mukayu ofrece tres bibliotecas, cada una con su propio ambiente único para disfrutar leyendo libros.<br><br>Biblioteca Principal<br>Biblioteca del Bosque<br>Biblioteca Cero',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/lib_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/lib_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/lib_img_03.jpg',
      ],
    },
    {
      id: 'kaiseki',
      title: 'Kaiseki Horin',
      description:
        'Es un restaurante elegante con veinticinco pilares y amplia terraza mirando al Jardín del Bosque. El "Rin" en la palabra "Horin" significa "juntos", que indica un sitio donde la gente se reúne y siente nuevas cosas. Cenas y desayunos se sirven aquí.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/cu_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/cu_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/cu_img_03.jpg',
      ],
    },
    {
      id: 'spa',
      title: 'Spa Entei y Tsukubai “Ho-sun”',
      description:
        'Una gran piscina redonda negra y la obra TSUKUBAI Hosun por Kenya Hara se ubican frente al Spa Entei. El arte fue instalado en Beniya Mukayu tras su exhibicion en el Museo de Arte Contemporaneo del Siglo XXI de Kanazawa en 2005. Spa Entei y sus masajes firma se inspiran en Yakushiyama, Montana del Buda de la Curacion, donde los monjes locales sanaban personas usando agua termal y hierbas medicinales.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/facilities/en_img_01.jpg',
      ],
    },
  ];
}
