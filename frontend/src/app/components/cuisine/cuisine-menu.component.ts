import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuisineCourseItemComponent } from './cuisine-course-item.component';

interface Course {
  title: string;
  items: string[];
}

interface SeasonData {
  id: string;
  name: string;
  courses: Course[];
}

const DINNER_UPGRADE_COURSE: Course = {
  title: 'Mejora de cena (disponible todo el año)',
  items: [
    '<strong>Kanazawa Sushi Kaiseki</strong><br><br>Con mariscos frescos y cuidadosamente seleccionados de Ishikawa. Este curso de sushi kaiseki destaca el sushi y al mismo tiempo ofrece una variedad de otros platos para una experiencia culinaria verdaderamente memorable.<br>◎ Se requiere reserva previa.<br>◎ Cargo adicional JPY 7,260- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
    '<strong>Menú de carne</strong><br><br>Pruebe varios platos de carne que incluyen carne "Wagyu" japonesa.<br>◎ Se requiere reserva previa.',
    '<strong>Menú vegetariano</strong><br><br>Pruebe las verduras locales japonesas.<br>◎ Se requiere reserva previa.',
  ],
};

@Component({
  selector: 'app-cuisine-menu',
  standalone: true,
  imports: [CommonModule, CuisineCourseItemComponent],
  template: `
    <div class="w-full">
      <div class="mb-[60px] md:mb-[100px]">
        <ul
          class="px-[26px] md:px-0 transition-all duration-[600ms] ease-[cubic-bezier(.39,.575,.565,1)]"
          [class.opacity-0]="!isVisible()"
          [class.translate-y-[15px]]="!isVisible()"
          [class.opacity-100]="isVisible()"
          [class.translate-y-0]="isVisible()"
        >
          <li
            *ngFor="let season of seasons"
            (click)="setActiveSeason(season.id)"
            class="inline-block relative mr-[40px] md:mr-[100px] uppercase pt-[5px] w-auto text-[#282828] text-[22px] md:text-[24px] cursor-pointer transition-opacity duration-[300ms] ease-in-out last:mr-0 select-none group"
            [class.opacity-30]="activeSeasonId() !== season.id"
            [class.opacity-100]="activeSeasonId() === season.id"
          >
            {{ season.name }}

            <span
              class="block absolute bottom-[5px] left-0 right-0 mx-auto w-full h-[1px] bg-black transition-opacity duration-[300ms] ease-in-out"
              [class.opacity-0]="activeSeasonId() !== season.id"
              [class.opacity-100]="activeSeasonId() === season.id"
            ></span>
          </li>
        </ul>
      </div>

      <div class="px-[26px] md:px-0 md:pr-[26px] mb-[150px]">
        <app-cuisine-course-item
          *ngFor="let course of activeSeasonData()?.courses"
          [course]="course"
        ></app-cuisine-course-item>
      </div>
    </div>
  `,
})
export class CuisineMenuComponent implements OnInit, OnDestroy {
  isVisible = signal<boolean>(false);
  activeSeasonId = signal<string>('summer');

  activeSeasonData = computed(() =>
    this.seasons.find((s) => s.id === this.activeSeasonId()),
  );

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  seasons: SeasonData[] = [
    {
      id: 'spring',
      name: 'Primavera',
      courses: [
        {
          title: 'Ejemplo de nuestros platos',
          items: [
            'Abulón Awabi cocido a fuego lento<br>Verduras de primavera con tofu y pasta de sésamo<br>Cangrejo peludo Kegani del puerto de Hashitate<br>Sashimi – Camarones Shirotora, Lenguado Hirame, Agujón japonés Sayori<br>Brote de bambú a la parrilla<br>Arroz cocinado con vieiras y erizo de mar o<br>Olla caliente de almejas con verduras<br>Gelato de sal de Noto en oblea monaka',
          ],
        },
        {
          title: 'Menú de degustación de brotes de bambú de la nueva temporada',
          items: [
            'Mejora tu cena al menú de degustación de Brotes de Bambú de Nueva Temporada.<br>◎ La disponibilidad depende de la temporada (finales de marzo a abril).<br>◎ Se requiere reserva previa.<br>◎ Se requiere un mínimo de 2 personas para la mejora.<br>*Para huéspedes en estancia individual, por favor contáctenos.<br>◎ Cargo adicional JPY 6,050- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            'Brotes de bambú en caldo<br>Cangrejo peludo Kegani del puerto de Hashitate<br>Sashimi – Brotes de bambú, Besugo Sakura, Jurel Ajitataki, Calamar Yariika<br>Brotes de bambú a la parrilla de carbón con miso de hierba kinome<br>Perca de garganta negra "Nodoguro" a la parrilla de carbón<br>Filete de carne "Wagyu" japonesa<br>Arroz cocinado con brotes de bambú<br>Gelato de sal de Noto en oblea monaka',
          ],
        },
        DINNER_UPGRADE_COURSE,
      ],
    },
    {
      id: 'summer',
      name: 'Verano',
      courses: [
        {
          title: 'Ejemplo de nuestros platos',
          items: [
            'Verduras de verano con pasta de nueces<br>Cangrejo peludo Kegani del puerto de Hashitate<br>Sopa de almejas servida en pepino ‘grande’ de Kaga<br>Sashimi – Mero de dientes largos Jiara, Pez limón Hiramasa, Jurel Aji<br>Pez dulce “Ayu” a la parrilla de carbón de la garganta de Shogawa<br>Verduras de Kaga a la sidra – Berenjena, Calabazas dulces de castaña de piel roja, Espinaca Kinjiso, etc.<br>Arroz cocinado con abulón Awabi y conchas de turbante Sazae o<br>Olla caliente de carne “Wagyu” japonesa con pimienta Sansho japonesa<br>Helado de almendras',
            '● Mejora tu cena con Sashimi de Abulón.<br>Disfruta de la textura firme y fresca del abulón y su umami natural.<br>◎ Disponible desde el 28 de abril hasta mediados de septiembre<br>*Dado que utilizamos ingredientes naturales, la disponibilidad puede variar según el clima.<br>◎ Se requiere reserva previa.<br>◎ Cada plato JPY 14,800- (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            '● Mejora tu cena con Filete de Abulón.<br>Un plato delicadamente asado a la parrilla, cuidadosamente preparado para sellar el profundo y sabroso umami del abulón.<br>◎ Disponible desde el 28 de abril hasta mediados de septiembre<br>*Dado que utilizamos ingredientes naturales, la disponibilidad puede variar según el clima.<br>◎ Se requiere reserva previa.<br>◎ Cada plato JPY 14,800- (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            '● Mejora tu cena con Abulón al Vapor.<br>◎ Disponible desde el 28 de abril hasta mediados de septiembre<br>◎ Se requiere reserva previa.<br>◎ Cada plato JPY 6,050- (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            '● Mejora tu cena con Ostra de roca de temporada<br>◎ Disponible desde el 10 de junio hasta el 9 de agosto<br>◎ Se requiere reserva previa.<br>◎ Cada uno JPY 3,000- (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
          ],
        },
        {
          title: 'Menú especial de abulón',
          items: [
            'Mejora tu cena al Curso Especial de Abulón.<br>◎ Se requiere reserva previa.<br>◎ Disponible desde el 20 de junio hasta el 10 de septiembre<br>◎ Se requiere un mínimo de 2 personas para la mejora.<br>◎ Cargo adicional JPY 30,000- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            'Menú como ejemplo :<br>Sopa de almejas servida en pepino ‘grande’ de Kaga<br>Abulón awabi cocido a fuego lento<br>Sashimi – abulón awabi<br>Abulón awabi a la parrilla de carbón<br>Surtido de verduras de Kaga<br>Gachas de arroz con abulón awabi<br>Postre – especialidades de temporada',
          ],
        },
        {
          title: 'Menú especial de abulón',
          items: [
            'Mejora tu cena al curso de ostra de roca.<br>◎ Se requiere reserva previa.<br>◎ Disponible desde el 10 de junio hasta el 9 de agosto<br>◎ Se requiere un mínimo de 2 personas para la mejora.<br>◎ Cargo adicional JPY 12,100- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            'Menú como ejemplo :<br>Ostra de roca Iwagaki con jugo de limón<br>Verduras de verano con tofu y pasta de sésamo<br>Sopa de albóndigas de ostra de roca Iwagaki<br>Sashimi – selección variada<br>Pez dulce “Ayu” a la parrilla de carbón de la garganta de Shogawa<br>Ostra de roca iwagaki a la parrilla de carbón<br>Arroz cocinado con ostras de roca iwagaki<br>Helado de shiso verde Oba',
          ],
        },
        DINNER_UPGRADE_COURSE,
      ],
    },
    {
      id: 'autumn',
      name: 'Otoño',
      courses: [
        {
          title: 'Ejemplo de nuestros platos',
          items: [
            'Sopa de pollo Yamanaka con hierbas medicinales<br>Cangrejo peludo Kegani del puerto de Hashitate<br>Hongos Matsutake al vapor en tetera de barro dobin<br>Sashimi – Camarón dulce Amaebi, Lenguado Karei, Calamar Akaika<br>Perca de garganta negra "Nodoguro" a la parrilla con arroz tostado<br>Verduras de otoño a la parrilla de carbón – Hongo Shiitake, Castaña, Nueces de Ginkgo, Barracuda, etc.<br>Carne "Wagyu" japonesa a la parrilla de carbón con salsa de higos<br>Arroz cocinado con hongos Matsutake<br>Flan de leche con jalea de miel<br>Pera de Kaga, Uva de Kaga',
            '● Mejora tu cena a los Siete hongos regionales servidos en olla caliente. Puedes disfrutar de los sabores del otoño con diferentes colores y texturas de ingredientes de temporada de la región.<br>◎ Disponible desde el 1 de octubre hasta el 6 de noviembre<br>*Dado que utilizamos ingredientes naturales, la disponibilidad puede variar según el clima.<br>◎ Se requiere reserva previa.<br>◎ Se requiere un mínimo de 2 personas para la mejora.<br>◎ Cargo adicional JPY 6,050- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            '● Mejora tu cena con hongo Matsutake a la parrilla de carbón.<br>◎ Disponible desde el 1 de septiembre hasta el 6 de noviembre<br>*Dado que utilizamos ingredientes naturales, la disponibilidad puede variar según el clima.<br>◎ Se requiere reserva previa.<br>◎ Una pieza de Matsutake (alrededor de 50g) JPY 9,680- (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
          ],
        },
        {
          title: 'Menú de hongos Matsutake',
          items: [
            'Mejora tu cena al curso de hongo Matsutake.<br>◎ Disponible desde el 1 de septiembre hasta el 6 de noviembre<br>*Dado que utilizamos ingredientes naturales, la disponibilidad puede variar según el clima.<br>◎ Se requiere reserva previa.<br>◎ Se requiere un mínimo de 2 personas para la mejora.<br>*Para huéspedes en estancia individual, por favor contáctenos.<br>◎ Cargo adicional JPY 12,100- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            'Menú como ejemplo :<br>Fideos soba con ñame rallado<br>Hongos Matsutake al vapor en tetera de barro dobin<br>Sashimi – Mero Ako, Carite lucio Sawara, Almeja Shirogai, Calamar Akaika<br>Verduras de otoño a la parrilla de carbón – Hongo Shiitake, Castaña, Nueces de Ginkgo, Barracuda, etc.<br>Guiso de cangrejo peludo kegani cocinado a fuego lento y melón de la sección calabaza<br>Perca de garganta negra "Nodoguro" a la parrilla de carbón y berenjenas<br>Arroz cocinado con hongos Matsutake<br>Helado de leche de soja y pera de Kaga',
          ],
        },
        DINNER_UPGRADE_COURSE,
      ],
    },
    {
      id: 'winter',
      name: 'Invierno',
      courses: [
        {
          title: 'Ejemplo de nuestros platos',
          items: [
            'Albóndiga de ñame al vapor<br>Cangrejo de las nieves hembra con jalea de ámbar<br>Sopa de nabo con camarones<br>Sashimi – Camarones Toraebi, Caracol marino Baigai, Jurel Buri<br>Cangrejo de las nieves a la parrilla de carbón<br>Albóndiga de raíz de loto de Kaga<br>Arroz cocinado con perca de garganta negra "Nodoguro"<br>Sorbete de mandarina<br>Fruta de temporada',
            '● Mejora tu cena con Sashimi de Cangrejo de las Nieves.<br>◎ Disponible desde el 7 de noviembre hasta el 20 de marzo<br>◎ Se requiere reserva previa.<br>◎ Cada plato JPY 9,680- (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            '● Mejora tu cena al Pato Silvestre servido en olla caliente. Pechuga e hígado de pato cocinados a fuego lento y rebozados con harina al estilo "Jibuni", esta olla caliente se termina con gachas, añadiendo albóndigas de pato, mizuna y cebolla verde a la parrilla dentro de la sopa.<br>◎ Disponible desde el 10 de enero hasta el 19 de marzo<br>*Dado que utilizamos ingredientes naturales, la disponibilidad puede variar según el clima.<br>◎ Se requiere reserva previa.<br>◎ Se requiere un mínimo de 2 personas para la mejora.<br>◎ Cargo adicional JPY 12,100- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
          ],
        },
        {
          title: 'Menú Kaiseki de cangrejo de las nieves',
          items: [
            'Mejora tu cena al Curso Kaiseki de Cangrejo de las Nieves.<br>◎ Disponible desde el 7 de noviembre hasta el 20 de marzo<br>*Dado que utilizamos ingredientes naturales, la disponibilidad puede variar según el clima.<br>◎ Se requiere reserva previa.<br>◎ Se requiere un mínimo de 2 personas para la mejora.<br>*Para huéspedes en estancia individual, por favor contáctenos.<br>◎ Cargo adicional JPY 26,950- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            'Menú como ejemplo :<br>Sopa de nabo<br>Cangrejo de las nieves hembra con jalea de ámbar<br>Verduras locales de temporada con tofu y pasta de sésamo<br>Sashimi – cangrejo de las nieves macho, jurel buri, camarón dulce amaebi, mero kue<br>Cangrejo de las nieves macho a la parrilla de carbón<br>Albóndiga de raíz de loto de Kaga<br>Arroz cocinado con cangrejo de las nieves y huevas de pescado curadas karasumi<br>Helado de almendras',
          ],
        },
        {
          title: 'Menú completo de cangrejo de las nieves',
          items: [
            'Mejora tu cena al menú completo de cangrejo de las nieves.<br>◎ Disponible desde el 7 de noviembre hasta el 20 de marzo<br>*Dado que utilizamos ingredientes naturales, la disponibilidad puede variar según el clima.<br>◎ Se requiere reserva previa.<br>◎ Se requiere un mínimo de 2 personas para la mejora.<br>◎ Cargo adicional JPY 47,630- por persona (incluyendo 10% de cargo por servicio y 10% de impuesto sobre las ventas).',
            'Menú como ejemplo :<br>Sopa de nabo<br>Cangrejo de las nieves hembra con jalea de ámbar<br>Sashimi – cangrejo de las nieves macho<br>Cangrejo de las nieves macho a la parrilla de carbón<br>Cangrejo de las nieves macho hervido<br>Arroz cocinado con cangrejo de las nieves y huevas de pescado curadas karasumi<br>Helado de almendras',
          ],
        },
        DINNER_UPGRADE_COURSE,
      ],
    },
  ];

  setActiveSeason(id: string): void {
    this.activeSeasonId.set(id);
  }
}
