import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuDetail {
  title: string;
  pricingHtml: string;
  accordionText?: string;
}

export interface CardData {
  id: string;
  title: string;
  description: string;
  images: string[];
  menuDetails?: MenuDetail[];
  isSmallText?: boolean;
  isTallImage?: boolean;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      [id]="data.id"
      class="w-full mb-[150px] md:mb-[150px] mt-[80px] md:mt-[120px] transition-all duration-[800ms]"
    >
      <div
        class="w-full"
        [ngClass]="{
          'block md:flex md:flex-row-reverse md:items-start': layout === 'side',
          'flex flex-col': layout === 'bottom',
        }"
      >
        <div class="w-full" [ngClass]="{ 'md:flex-1': layout === 'side' }">
          <div
            (click)="nextImage()"
            class="relative w-full flex-1 overflow-hidden cursor-pointer select-none transition-all duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
            [ngClass]="{
              'min-h-[250px] md:min-h-[150vh]': data.isTallImage,
              'min-h-[250px] md:min-h-[100vh] md:flex-1':
                layout === 'side' && !data.isTallImage,
              'min-h-[250px] md:min-h-[65vh]':
                layout === 'bottom' && !data.isTallImage,
              'opacity-0 translate-y-[25px]': !isVisible(),
              'opacity-100 translate-y-0': isVisible(),
            }"
          >
            <ul class="absolute inset-0 list-none m-0 p-0">
              <li
                *ngFor="let img of data.images; let i = index"
                class="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
                [class.opacity-100]="i === currentIndex()"
                [class.opacity-0]="i !== currentIndex()"
              >
                <img
                  [src]="img"
                  [alt]="data.title"
                  class="w-full h-full object-cover"
                />
              </li>
            </ul>
          </div>

          @if (data.menuDetails && data.menuDetails.length > 0) {
            <div
              class="w-full mt-[40px] md:mt-[60px] md:mb-[0px] text-left transition-all duration-[800ms] delay-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
              [ngClass]="{
                'opacity-0 translate-y-[25px]': !isVisible(),
                'opacity-100 translate-y-0': isVisible(),
              }"
            >
              @for (
                menu of data.menuDetails;
                track menu.title;
                let i = $index
              ) {
                <div class="mb-[60px] md:mb-[95px] last:mb-0">
                  <h3
                    class="text-[16px] md:text-[20px] leading-[1.75] mb-[15px] font-semibold text-gray-900"
                  >
                    {{ menu.title }}
                  </h3>

                  <div
                    class="text-[13px] md:text-[16px] font-medium leading-[2] mb-[15px] text-black md:max-w-[740px]"
                    [innerHTML]="menu.pricingHtml"
                  ></div>

                  @if (menu.accordionText) {
                    <div>
                      <div
                        class="grid transition-all duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
                        [ngStyle]="{
                          'grid-template-rows': openAccordions().has(i)
                            ? '1fr'
                            : '0fr',
                        }"
                      >
                        <div class="overflow-hidden min-h-0">
                          <p
                            class="text-[13px] md:text-[16px] font-medium leading-[1.6] md:max-w-[540px] text-black transition-opacity duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
                            [ngClass]="
                              openAccordions().has(i)
                                ? 'opacity-100'
                                : 'opacity-0'
                            "
                            [innerHTML]="menu.accordionText"
                          ></p>
                        </div>
                      </div>

                      <div
                        (click)="toggleAccordion(i)"
                        class="text-[#939393] font-medium text-[0.925rem] leading-[2] inline-block pl-[20px] mt-[15px] relative cursor-pointer select-none"
                      >
                        <span
                          class="absolute left-0 top-[14px] w-[9px] h-[1px] bg-[#939393] transition-transform duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)]"
                        ></span>

                        <span
                          class="absolute left-[4px] top-[10px] w-[1px] h-[9px] bg-[#939393] transition-all duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)]"
                          [class.opacity-0]="openAccordions().has(i)"
                          [class.rotate-90]="openAccordions().has(i)"
                        ></span>

                        <span class="relative block min-w-[120px]">
                          <span
                            class="transition-opacity duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)] bloc "
                            [class.opacity-0]="openAccordions().has(i)"
                          >
                            Más información
                          </span>
                          <span
                            class="absolute left-0 top-0 transition-opacity duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)] block"
                            [class.opacity-0]="!openAccordions().has(i)"
                          >
                            Cerrar
                          </span>
                        </span>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>

        <div
          class="px-[26px] md:px-0"
          [ngClass]="{
            'md:mr-[85px] md:w-[370px] md:shrink-0 mt-[40px] md:mt-0 md:pt-[60px]':
              layout === 'side',
            'mt-[40px] md:mt-[80px] w-full max-w-[800px] mx-auto text-center':
              layout === 'bottom',
          }"
        >
          <h2
            class="tracking-[0.045em] leading-[1.7] mb-[32px] text-[22px] font-semibold text-gray-900 relative transition-all duration-[800ms] delay-[300ms] ease-[cubic-bezier(.39,.575,.565,1)]"
            [ngClass]="{
              'opacity-0 translate-y-[25px]': !isVisible(),
              'opacity-100 translate-y-0': isVisible(),
            }"
          >
            {{ data.title }}
            <span
              class="block h-[1px] bg-black mt-[17px]"
              [ngClass]="layout === 'side' ? 'w-[40px]' : 'w-[40px] mx-auto'"
            ></span>
          </h2>

          <div
            class="transition-all duration-[800ms] delay-[600ms] ease-[cubic-bezier(.39,.575,.565,1)]"
            [ngClass]="{
              'opacity-0 translate-y-[25px]': !isVisible(),
              'opacity-100 translate-y-0': isVisible(),
            }"
          >
            <div class="mb-[30px]">
              <p
                class="font-semibold leading-[1.4] md:leading-[1.6] tracking-[1px] text-gray-800"
                [ngClass]="
                  data.isSmallText
                    ? 'text-[12px] md:text-[14px]'
                    : 'text-[13px] md:text-[16px]'
                "
                [innerHTML]="data.description"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: CardData;
  @Input() layout: 'side' | 'bottom' = 'side';

  currentIndex = signal<number>(0);
  isVisible = signal<boolean>(false);

  openAccordions = signal<Set<number>>(new Set());

  private timer: any;
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.startTimer();
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

  toggleAccordion(index: number): void {
    const currentSet = new Set(this.openAccordions());
    if (currentSet.has(index)) {
      currentSet.delete(index);
    } else {
      currentSet.add(index);
    }
    this.openAccordions.set(currentSet);
  }

  startTimer(): void {
    if (this.data?.images?.length > 1) {
      this.stopTimer();
      this.timer = setInterval(() => {
        this.advanceImage();
      }, 4500);
    }
  }

  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  nextImage(): void {
    if (this.data?.images?.length > 1) {
      this.advanceImage();
      this.startTimer();
    }
  }

  private advanceImage(): void {
    this.currentIndex.update((idx) => (idx + 1) % this.data.images.length);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.observer?.disconnect();
  }
}
