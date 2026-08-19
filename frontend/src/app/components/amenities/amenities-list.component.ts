import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Amenity {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  prices: { size: string; price: string }[];
  description: string;
  purchaseLink: string;
}

@Component({
  selector: 'app-amenities-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="px-[26px] mb-[150px] md:px-0 md:mt-[190px]">
      <div>
        <h2
          class="relative mb-[30px] pb-[10px] text-[16px] font-medium transition-all duration-[600ms] ease-[cubic-bezier(.39,.575,.565,1)] md:text-[20px] md:-ml-[45px] md:mb-0 md:pb-0"
        >
          Lista de Amenidades de Yakushiyama
        </h2>
      </div>

      <div
        class="grid grid-cols-1 gap-y-[150px] md:grid-cols-2 md:gap-y-[95px] md:gap-x-[28px] md:-ml-[45px] md:pr-[40px] mt-[40px] md:mt-[95px]"
      >
        @for (item of amenitiesData; track item.id) {
          <section class="flex flex-col">
            <div
              class="w-[calc(100%+52px)] -mx-[26px] transition-all duration-[600ms] ease-[cubic-bezier(.39,.575,.565,1)] md:w-full md:mx-0"
            >
              <img
                [src]="item.image"
                [alt]="item.title"
                class="block w-full object-cover"
              />
            </div>

            <div class="flex flex-col flex-grow">
              <h3
                class="my-[30px] mb-[15px] text-[16px] font-medium leading-[1.5] transition-all duration-[600ms] ease-[cubic-bezier(.39,.575,.565,1)] md:text-[22px]"
              >
                {{ item.title }}
                <span class="block text-[12px] md:text-[16px] font-medium">{{
                  item.subtitle
                }}</span>
              </h3>

              <p
                class="text-[0.875rem] font-medium leading-[1.8] text-justify transition-all duration-[600ms] ease-[cubic-bezier(.39,.575,.565,1)] md:text-[0.95rem]"
              >
                @for (price of item.prices; track price.size) {
                  {{ price.size }}: {{ price.price }}<br />
                }
              </p>

              <div
                class="transition-all duration-[600ms] ease-[cubic-bezier(.39,.575,.565,1)]"
              >
                <p
                  class="mt-[15px] leading-[1.6] font-medium text-justify text-[0.925rem] overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)] md:text-[1rem] md:w-[calc(100%-50px)] md:!max-h-[1000px] md:!opacity-100"
                  [class.max-h-0]="!openAccordions().has(item.id)"
                  [class.opacity-0]="!openAccordions().has(item.id)"
                  [class.max-h-[1000px]]="openAccordions().has(item.id)"
                  [class.opacity-100]="openAccordions().has(item.id)"
                >
                  {{ item.description }}
                </p>

                <button
                  class="md:hidden text-[#000] text-[16px] flex items-center relative pl-[25px] w-full text-left transition-all duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)] h-[30px]"
                  [class.mt-[30px]]="openAccordions().has(item.id)"
                  [class.mt-[15px]]="!openAccordions().has(item.id)"
                  (click)="toggleAccordion(item.id)"
                >
                  <div
                    class="absolute left-[4px] top-1/2 -translate-y-1/2 w-[9px] h-[9px] transition-transform duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)]"
                    [class.rotate-45]="openAccordions().has(item.id)"
                  >
                    <span
                      class="absolute top-1/2 left-0 w-full h-[1px] bg-[#000] -translate-y-1/2"
                    ></span>
                    <span
                      class="absolute top-0 left-1/2 w-[1px] h-full bg-[#000] -translate-x-1/2"
                    ></span>
                  </div>

                  <span
                    class="absolute left-[25px] transition-opacity duration-[400ms]"
                    [class.opacity-0]="openAccordions().has(item.id)"
                    [class.opacity-100]="!openAccordions().has(item.id)"
                  >
                    More Information
                  </span>
                  <span
                    class="absolute left-[25px] transition-opacity duration-[400ms]"
                    [class.opacity-100]="openAccordions().has(item.id)"
                    [class.opacity-0]="!openAccordions().has(item.id)"
                  >
                    Close
                  </span>
                </button>
              </div>
            </div>

            <div class="mt-[30px] md:mt-[40px] flex">
              <a
                [href]="item.purchaseLink"
                class="group relative inline-flex items-center justify-center border rounded border-black px-[40px] py-[12px] text-[0.975rem] font-semibold tracking-[0.15em] uppercase text-gray-800 transition-all duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)] hover:bg-[#000] hover:border-black hover:text-white"
              >
                Comprar Ahora
              </a>
            </div>
          </section>
        }
      </div>
    </section>
  `,
  styles: [],
})
export class AmenitiesListComponent {
  openAccordions = signal<Set<number>>(new Set());

  toggleAccordion(id: number) {
    this.openAccordions.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  amenitiesData: Amenity[] = [
    {
      id: 1,
      image:
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_03.jpg',
      title: 'Champú Yakushiyama',
      subtitle: '— Champú de la Montaña del Buda de la Medicina',
      prices: [
        { size: '50ml', price: '¥1,430' },
        { size: '400ml', price: '¥5,940' },
      ],
      description:
        'Burbujas suaves y finas eliminan el exceso de sebo mientras cuidan delicadamente el cuero cabelludo. Este champú ha resuelto los problemas de sensación áspera y baja capacidad de espuma que suelen verse en otros productos sin aditivos. Hasta 30 tipos de elementos de belleza aportan hidratación y flexibilidad a su cabello, logrando además un pelo sano, voluminoso, con firmeza y elasticidad. El aceite esencial “Refresh Blend” renueva su mente y cuerpo con su aroma fresco y revitalizante.',
      purchaseLink: '#purchase',
    },
    {
      id: 2,
      image:
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_04.jpg',
      title: 'Acondicionador Yakushiyama',
      subtitle: '— Acondicionador de la Montaña del Buda de la Medicina',
      prices: [
        { size: '50ml', price: '¥1,540' },
        { size: '400ml', price: '¥6,435' },
      ],
      description:
        'Este acondicionador, que es más bien como una esencia de belleza natural, también funciona como un tratamiento capilar que contiene 27 tipos diferentes de elementos de belleza derivados de plantas y del mar que aportan brillo e hidratación a su cabello. Un aminoácido especial repara rápidamente el daño desde el núcleo de su cabello y da como resultado un pelo hermoso, sedoso y flexible. Debido a que solo se utilizan ingredientes de origen natural, no es necesario enjuagarlo por completo. El aceite esencial “Relax Blend” produce un aroma suave que relaja su mente.',
      purchaseLink: '#purchase',
    },
    {
      id: 3,
      image:
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_05.jpg',
      title: 'Gel de ducha Yakushiyama',
      subtitle: '— Gel de ducha de la Montaña del Buda de la Medicina',
      prices: [
        { size: '50ml', price: '¥1,430' },
        { size: '400ml', price: '¥5,940' },
      ],
      description:
        'Burbujas suaves y finas envuelven delicadamente su piel. Su aminoácido especial mejora rápidamente la textura de la superficie cutánea donde se han producido daños por la sequedad, los rayos ultravioleta y otros factores. 17 tipos de elementos de belleza de origen natural, incluido el colágeno marino de tamaño nano, dan como resultado una piel hidratada y fresca. El aceite esencial “Irreplaceable Blend” produce un aroma que actúa profundamente en el núcleo de su cuerpo.',
      purchaseLink: '#purchase',
    },
    {
      id: 4,
      image:
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_06.jpg',
      title: 'Loción corporal Yakushiyama',
      subtitle: '— Loción corporal de la Montaña del Buda de la Medicina',
      prices: [
        { size: '50ml', price: '¥2,420' },
        { size: '250ml', price: '¥6,600' },
      ],
      description:
        'Con 20 tipos diferentes de elementos de belleza de origen natural para la retención de la humedad dispensados con generosidad, tales como escualano (aceite de hígado de tiburón de océano profundo), colágeno marino de tamaño nano, vitamina A, rafinosa (oligosacárido natural), ácido hialurónico, etc., este producto aporta hidratación y flexibilidad a la piel mientras mantiene de forma segura su nivel de humedad. El aceite esencial “Irreplaceable Blend” produce un aroma que actúa profundamente en el núcleo de su cuerpo.',
      purchaseLink: '#purchase',
    },
    {
      id: 5,
      image:
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_07.jpg',
      title: 'Gel limpiador Yakushiyama',
      subtitle: '— Gel limpiador de la Montaña del Buda de la Medicina',
      prices: [
        { size: '50ml', price: '¥2,640' },
        { size: '250ml', price: '¥7,260' },
      ],
      description:
        'Este es un innovador producto de limpieza de tipo gel que elimina el maquillaje y el exceso de sebo y, al mismo tiempo, entrega colágeno marino de tamaño nano profundamente en la capa córnea de la piel. Todos sus ingredientes de limpieza son lo suficientemente suaves incluso para las partes vulnerables de la piel. Puede sentir su piel completamente hidratada después de usarlo. El aceite esencial “Relax Blend” produce un aroma suave que relaja su mente.',
      purchaseLink: '#purchase',
    },
    {
      id: 6,
      image:
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_08.jpg',
      title: 'Limpiador facial Yakushiyama',
      subtitle: '— Limpiador facial de la Montaña del Buda de la Medicina',
      prices: [
        { size: '50ml', price: '¥2,970' },
        { size: '250ml', price: '¥8,580' },
      ],
      description:
        'Este es un producto de limpieza facial de tipo espuma que aporta hidratación a la piel. Todos sus ingredientes limpiadores son de tipo aminoácido, los cuales son suaves con la piel. Su aminoácido especial mejora la textura cutánea, mientras que 22 tipos de elementos de belleza de origen natural se dispensan generosamente tal como en una esencia de belleza, logrando así una piel suave y radiante. El aceite esencial “Relax Blend” produce un aroma suave que relaja su mente.',
      purchaseLink: '#purchase',
    },
    {
      id: 7,
      image:
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_09.jpg',
      title: 'Loción Yakushiyama',
      subtitle: '— Loción de la Montaña del Buda de la Medicina',
      prices: [
        { size: '50ml', price: '¥4,180' },
        { size: '250ml', price: '¥11,550' },
      ],
      description:
        'Esta es una loción esencia de cuidado especial, la cual consiste en una mezcla de esencia de belleza y loción. El papel más importante de una loción es proteger la piel de la sequedad al suministrar suficiente humedad y retenerla. Al dispensar generosamente 16 tipos de elementos de belleza de origen natural con altas capacidades de retención de humedad, incluido el doble colágeno, se asegura un camino desde la superficie de la piel hasta la parte profunda de la capa celular para que la humedad pueda penetrar por completo y lograr una piel radiante y suave. El aceite esencial “Relax Blend” produce un aroma suave que relaja su mente.',
      purchaseLink: '#purchase',
    },
    {
      id: 8,
      image:
        'https://mukayu.com/wp-content/themes/corporate/img/amenities/amenities_img_10.jpg',
      title: 'Emulsión Yakushiyama',
      subtitle: '— Emulsión de la Montaña del Buda de la Medicina',
      prices: [
        { size: '50ml', price: '¥4,290' },
        { size: '250ml', price: '¥13,200' },
      ],
      description:
        'Esta es una emulsión esencia de cuidado especial, la cual consiste en una mezcla de esencia de belleza y emulsión. Por favor, disfrute del lujoso acabado tras utilizar este producto, en el cual se dispensan generosamente 11 tipos de elementos de belleza de origen natural, que incluyen escualano (aceite de hígado de tiburón de océano profundo) como base, colágeno marino de tamaño nano y un muy destacado aminoácido multifuncional que mejora la textura de la piel. El aceite esencial “Relax Blend” produce un aroma suave que relaja su mente.',
      purchaseLink: '#purchase',
    },
  ];
}
