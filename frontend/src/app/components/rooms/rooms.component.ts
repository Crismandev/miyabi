import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCardComponent, Room } from './room-card.component';
import { SectionHeaderComponent } from '../section-header.component';
import { AnchorNavComponent, AnchorItem } from '../anchor-nav.component';
import { RoomInfoComponent, InfoRow } from './room-info.component';
import { RoomPolicyComponent } from './room-policy.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    AnchorNavComponent,
    SectionHeaderComponent,
    RoomCardComponent,
    RoomInfoComponent,
    RoomPolicyComponent,
  ],
  template: `
    <main
      id="main"
      data-page="rooms"
      class="relative block w-full pt-[65px] pr-[65px] pb-0 pl-[150px] text-black tracking-[1px] box-inherit"
    >
      <app-anchor-nav [items]="anchorList"></app-anchor-nav>

      <app-section-header
        sideImageJp="https://mukayu.com/wp-content/themes/corporate/img/rooms_jp.svg"
        headerTitle="Habitaciones"
        conceptText="Miyabi cuenta con 16 amplias habitaciones en una atmósfera serena y apacible. Cada estancia se abre hacia el Jardín del Bosque, donde los árboles crecen en plena libertad. Los amplios ventanales invitan a la naturaleza a fundirse con el interior, permitiendo a los huéspedes conectar con sus ritmos naturales. Además, cada habitación dispone de un baño privado termal al aire libre para disfrutar de las aguas termales cuando deseen."
      ></app-section-header>

      <div class="mt-[100px]">
        <app-room-card
          *ngFor="let room of roomList"
          [room]="room"
        ></app-room-card>
      </div>

      <app-room-info id="info" [infoData]="generalInfo"></app-room-info>

      <app-room-policy
        id="policy"
        title="Política de Niños y Grupos"
        [policies]="roomPolicies"
      >
      </app-room-policy>
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
export class RoomsComponent {
  anchorList: AnchorItem[] = [
    { id: 'wa', label: 'Japonesa Premier Tatami' },
    { id: 'you', label: 'Occidental Premier' },
    { id: 'wayou-jr', label: 'Junior Suite' },
    { id: 'wayou-exe', label: 'Executive Suite' },
    { id: 'byakugun', label: 'Suite Byakugun' },
    { id: 'wakamidori', label: 'Suite Wakamidori' },
    { id: 'info', label: 'Información de la Habitación' },
    { id: 'policy', label: 'Política' },
  ];

  roomList: Room[] = [
    {
      id: 'wa',
      title: 'Habitación Japonesa Premier de Tatami con Vistas al Jardín',
      subtitle: '4 habitaciones',
      description:
        'Una nueva estética japonesa, ligera y contemporánea, impregna estas estancias, creadas al organizar capas de materiales naturales tradicionales que respiran y envejecen con el paso del tiempo, como tatami, papel japonés, bambú y tierra de diatomeas. Cada una de ellas posee un baño termal privado al aire libre, una galería de bambú y terraza de madera mirando al Jardín del Bosque.',
      drawingImage:
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wa_drawing_en.svg',
      planEn:
        'Habitación japonesa de tatami con sofá + terraza de madera + galería de bambú + baño termal privado al aire libre',
      features: [
        'Situado en la 1.ª planta o planta jardín, frente al Jardín del Bosque, con terraza de madera',
        'Hamaca disponible bajo petición, sujeta a disponibilidad',
        'Sofá',
        'Los huéspedes duermen en colchones futón tradicionales japoneses sobre el suelo de tatami',
        'Tamaño de la habitación: 70 ㎡',
        'Ocupación máxima: 3 huéspedes',
      ],
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wa_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wa_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wa_img_03.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wa_img_04.jpg',
      ],
    },
    {
      id: 'you',
      title: 'Habitación Occidental Premier con Vistas al Jardín',
      subtitle: '2 habitaciones',
      description:
        'Puro lujo occidental moderno con vistas al Jardín del Bosque desde el piso superior. Cada habitación ofrece una enorme terraza de madera con claraboya, un gran sofá para el relax, escritorio y baño de aguas termales privado.',
      drawingImage:
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/you_drawing_en.svg',
      planEn:
        'Dormitorio + terraza de madera + sofá + escritorio + baño termal privado al aire libre',
      features: [
        'Ubicado en el piso superior, orientado hacia el Jardín del Bosque, con una amplia terraza de madera',
        'Hamaca disponible bajo petición, sujeta a disponibilidad',
        '2 camas individuales (120x195 cm / 47x76 pulgadas cada una) que se pueden combinar',
        'Tamaño de la habitación: 60 m²',
        'Escalera (18 escalones) para subir a la habitación. No apto para personas mayores o con movilidad reducida',
        'Ocupación máxima: 2 huéspedes',
      ],
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/you_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/you_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/you_img_03.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/you_img_04.jpg',
      ],
    },
    {
      id: 'wayou-jr',
      title: 'Junior Suite Estilo Zen',
      subtitle: '2 suites',
      description:
        'Hechas con materiales japoneses tradicionales, estas suites unen el encanto y confort de los estilos nipón y occidental. Ubicada en el primer piso cerca del Jardín del Bosque, cada una posee terraza de madera, porche de bambú, sala japonesa de tatami con sofá, un dormitorio y baño termal privado exterior con jacuzzi.',
      drawingImage:
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wayou-js_drawing_en.svg',
      planEn:
        'Habitación japonesa de tatami con sofá + dormitorio + terraza de madera + galería de bambú + baño termal privado al aire libre',
      features: [
        'Situado en la 1.ª planta, frente al Jardín del Bosque, con terraza de madera',
        '2 camas individuales (120x195 cm / 47x76 pulgadas cada una) que se pueden combinar',
        'Sofá y jacuzzi',
        'Tamaño de la habitación: 70 m²',
        'Ocupación máxima: 3 huéspedes',
      ],
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wayou-j_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wayou-j_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wayou-j_img_03.jpg',
      ],
    },
    {
      id: 'wayou-exe',
      title: 'Suite Ejecutiva Estilo Zen',
      subtitle: '6 suites',
      description:
        'Con galería de bambú, sala japonesa de tatami con vestidor, dormitorio y baño termal exterior privado, estas seis espaciosas suites combinan el estilo nipón y occidental con vistas al Jardín del Bosque. Desde las ventanas, situadas en pisos altos, se contemplan árboles como pinos, sakuras de montaña, cerezos llorones, membrillos y camelias extendiendo libremente sus ramas en el Jardín del Bosque.',
      drawingImage:
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wayou-ex_drawing_en.svg',
      planEn:
        'Habitación japonesa de tatami + galería de bambú + dormitorio + baño termal privado al aire libre',
      features: [
        'Tamaño de la habitación: 95–100 m²',
        'Ubicado en las plantas 2.ª, 3.ª y 4.ª, frente al Jardín del Bosque',
        '2 camas individuales (120x195 cm / 47x76 pulgadas cada una) que se pueden combinar',
        'Vestidor',
        'Ocupación máxima: 4 huéspedes',
      ],
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wayou_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wayou_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wayou_img_03.jpg',
      ],
    },
    {
      id: 'byakugun',
      title: 'Suite Wakamurasaki',
      subtitle: '',
      description:
        'La suite más amplia con vistas únicas a la flor del cerezo en primavera, verdes vivos en verano, hojas otoñales y nieve invernal. Wakamurasaki posee puertas correderas de cristal de techo a suelo abiertas de par en par hacia el Jardín del Bosque. En la floración, los huéspedes admiran un cerezo de montaña con más de cien años justo frente a ellos, mientras pétalos de flores de cerezo flotan suavemente hacia el interior de la galería de bambú.',
      drawingImage:
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wakamurasaki_drawing_en.svg',
      planEn:
        'Habitación japonesa de tatami + sala de estar + galería de bambú + dormitorio + baño termal privado al aire libre',
      features: [
        'Tamaño de la habitación: 120 m²',
        'Ubicado en el 2.° piso, frente al Jardín del Bosque',
        'Sala de estar con mesa lacada de 3 metros / 118 pulgadas de largo',
        '2 camas individuales (120x195 cm / 47x76 pulgadas cada una) que se pueden combinar',
        'Vestidor',
        'Ocupación máxima: 4 huéspedes',
      ],
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wakamurasaki_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wakamurasaki_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/wakamurasaki_img_03.jpg',
      ],
    },
    {
      id: 'wakamidori',
      title: 'Suite con Terraza Byakuroku',
      subtitle: '',
      description:
        'Con un aislado baño termal privado exterior y una amplia terraza de madera que se extiende casi al alcance de la mano hacia el Jardín del Bosque, la suite Byakuroku es un sitio ideal para escapar de la rutina diaria mientras se limpia y rejuvenece cuerpo y mente. En esta cómoda suite, el estudio integrado entre el baño y la terraza es el espacio perfecto para la imaginación creativa o el pensamiento meditativo de un espíritu renovado.',
      drawingImage:
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/byakuroku_drawing_en.svg',
      planEn:
        'Habitación japonesa de tatami + estudio + galería de bambú + terraza de madera + dormitorio + baño termal privado al aire libre',
      features: [
        'Situado en la 1.ª planta, frente al Jardín del Bosque con una gran terraza de madera',
        'Estudio con escritorio y sofá',
        '2 camas individuales (120x195 cm / 47x76 pulgadas cada una) que se pueden combinar',
        'Vestidor',
        'El tamaño de la habitación es de 110 m²',
        'Ocupación máxima: 4 huéspedes',
      ],
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/byakuroku_img_01.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/byakuroku_img_02.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/byakuroku_img_03.jpg',
        'https://mukayu.com/wp-content/themes/corporate/img/rooms/byakuroku_img_04.jpg',
      ],
    },
  ];

  generalInfo: InfoRow[] = [
    {
      label: 'Habitaciones',
      nestedList: [
        {
          term: 'Habitación Japonesa Premier de Tatami con Vistas al Jardín',
          desc: '4 habitaciones',
        },
        {
          term: 'Habitación Occidental Premier con Vistas al Jardín',
          desc: '2 habitaciones',
        },
        { term: 'Junior Suite Estilo Zen', desc: '2 habitaciones' },
        { term: 'Suite Ejecutiva Estilo Zen', desc: '6 habitaciones' },
        { term: 'Suite Wakamurasaki', desc: '1 habitaciones' },
        { term: 'Suite con Terraza Byakuroku', desc: '1 habitaciones' },
      ],
      note: 'Total de 16 habitaciones',
    },
    {
      label: 'Check-in',
      value: '15:00',
    },
    {
      label: 'Check-out',
      value: '11:00',
    },
    {
      label: 'Cocina',
      value: 'Las cenas se toman en Kaiseki',
    },
    {
      label: 'Baños termales de aguas sulfurosas',
      value:
        'Las habitaciones tienen baño termal privado exterior y ducha. Baños comunes cubiertos y exteriores por géneros y sauna están a disposición',
    },
    {
      label: 'Artículos de tocador Yakushiyama',
      value:
        'Champú, Acondicionador, Gel de baño, Loción corporal, Jabón de manos, Desmaquillante, Limpiador facial, Tónico, Emulsión hidratante',
    },
    {
      label: 'Amenidades',
      value:
        'Yukata, Pijamas, Toalla de baño, Toalla de cara, Toalla de manos, Toalla corporal, Gorro de ducha, Set de algodón, Goma para el pelo, Cepillo de pelo, Cepillo de dientes, Maquinilla de afeitar, Secador de pelo',
    },
    {
      label: 'Internet',
      value: 'Conexión Wi-Fi gratuita e ilimitada disponible en todo el hotel',
    },
    {
      label: 'Minibar',
      value: 'Refrescos y bebidas alcohólicas disponibles',
    },
    {
      label: 'Aire acondicionado y calefacción',
      value: "'Disponible'",
    },
    {
      label: 'Aparcamiento',
      value: 'Disponible',
    },
    {
      label: 'Tarjeta de crédito',
      value: 'VISA, JCB, AMEX, DINERS, UC, DC, MASTER',
    },
  ];

  roomPolicies: string[] = [
    'No se permiten niños menores de 7 años',
    'Los niños de entre 7 y 12 años son bienvenidos con una tarifa especial para niños; por favor, contáctenos directamente para más detalles',
    'Los niños mayores de 12 años se consideran adultos',
    'No aceptamos reservas para grupos de más de 6 personas',
  ];
}
