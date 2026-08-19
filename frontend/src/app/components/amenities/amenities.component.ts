import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../section-header.component';
import { CardComponent, CardData } from '../cards.component';
import { AmenitiesListComponent } from './amenities-list.component';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeaderComponent,
    CardComponent,
    AmenitiesListComponent,
  ],
  template: `
    <main
      id="main"
      data-page="rooms"
      class="relative block w-full pt-[65px] pr-[65px] pb-0 pl-[150px] text-black tracking-[1px] box-inherit"
    >
      <app-section-header
        sideImageJp="https://mukayu.com/wp-content/themes/corporate/img/amenity_jp.svg"
        headerTitle="Amenidades de Yakushima"
        conceptText=""
      ></app-section-header>

      <app-card *ngFor="let item of amenitiesData" [data]="item"> </app-card>

      <app-amenities-list></app-amenities-list>
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
export class AmenitiesComponent {
  amenitiesData: CardData[] = [
    {
      id: 'water-hotsprings',
      title:
        'Aguas termales de Yamashiro y Yakushiyama— La montaña del Buda de la Medicina',
      description:
        'Las aguas termales de Yamashiro se han desarrollado en estrecha relación con "Hakusan", montaña sagrada de la región. Durante el período Heian (hace unos 1,000 años), se construyeron los Cinco Templos de Hakusan, pilares de la fe local. Estos templos se alineaban a distancias iguales mirando hacia Gozengamine, el pico más alto de Hakusan. Yakuoin Onsenji, el principal de ellos, contaba con cientos de templos filiales. Históricamente, los alrededores de este templo se conocían como “Yakushiyama (Montaña del Buda de la Medicina)” por su alta espiritualidad. Era un centro de entrenamiento para monjes y un lugar de sanación donde curaban a la gente con baños termales y hierbas medicinales.Miyabi es un hotel termal situado discretamente en una colina de esta sagrada Yakushiyama, justo donde se ubicaba el salón principal de Yakuoin Onsenji. En nuestro “Spa Entei” ofrecemos tratamientos Yakushiyama, servicios premium de bienestar físico y mental que utilizan agua termal y plantas medicinales, heredando el espíritu de los antiguos remedios de los monjes. Además, inspirados en esta tradición, colaboramos con el destacado bioquímico Dr. Yoon Soung Choi para crear la línea exclusiva de amenidades de Yakushiyama. Estos productos combinan minerales de las termas de Yamashiro con selectos ingredientes naturales. Es una línea de máxima calidad que presentamos con todo nuestro corazón.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_01.svg',
      ],
    },
    {
      id: 'water-hotsprings',
      title: 'Filosofía de las Amenidades de Yakushiyama',
      description:
        'Para mantener el cabello, el cuero cabelludo y la piel en condiciones saludables y bellas, es vital potenciar la fuerza de la propia piel activando sus células y sus casi un billón de bacterias autóctonas (bacterias benéficas). Con este fin, Yakushiyama evitó cualquier ingrediente sintético que pudiera debilitar la piel o causarle efectos negativos; al mismo tiempo, añadió con generosidad y la máxima opulencia ingredientes naturales que aportan efectos positivos a las células. Los ingredientes naturales poseen un poder maravilloso, y combinar adecuadamente dos o más de ellos puede multiplicar sus beneficios. Para analizar estos mecanismos naturales desde una perspectiva compleja y elevar su poder de integración, se aprovecha plenamente la biotecnología de vanguardia con el fin de inducir los máximos efectos. La línea de amenidades Yakushiyama es una gama para el cuidado de la piel en la que se fusionan los ingredientes naturales y la tecnología más avanzada.<br><br><span class="text-[0.825rem]">Dr. Yoon Soung Choi | Departamento de Química y Biotecnología, Escuela de Posgrado de Ingeniería, Universidad de Tokio</span>',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_02.jpg',
      ],
    },
  ];
}
