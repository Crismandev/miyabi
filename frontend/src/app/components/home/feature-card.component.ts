import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section
      class="w-full flex flex-col md:flex-row-reverse justify-end mb-[95px] last:mb-[200px] group"
    >
      <!-- 1. Columna Derecha -->
      <a
        [routerLink]="link"
        class="block w-full md:overflow-hidden min-[1400px]:min-w-[755px] relative z-0 flex justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
        [class.opacity-0]="!isVisible"
        [class.translate-y-[50px]]="!isVisible"
        [class.opacity-100]="isVisible"
        [class.translate-y-0]="isVisible"
      >
        <img
          [src]="imageUrl"
          alt="Feature Image"
          class="w-full md:w-[755px] md:max-w-none min-[1400px]:w-full h-auto object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
        />
      </a>

      <!-- Columna Izquierda -->
      <div
        class="w-full md:min-w-[340px] md:max-w-[340px] md:mr-[80px] relative"
      >
        <h2 class="px-[26px] mt-[20px] md:px-0 md:mt-[50px] relative text-left">
          <a
            [routerLink]="link"
            class="block md:hidden h-[34px] transition-all duration-[1000ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
            [class.opacity-0]="!isVisible"
            [class.translate-y-[30px]]="!isVisible"
            [class.opacity-100]="isVisible"
            [class.translate-y-0]="isVisible"
            style="transition-delay: 0.4s;"
          >
            <img [src]="imageSpUrl" alt="Título Móvil" class="h-full w-auto" />
          </a>

          <a
            [routerLink]="link"
            class="hidden md:inline-block md:w-[20px] transition-all duration-[1000ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
            [class.opacity-0]="!isVisible"
            [class.translate-y-[30px]]="!isVisible"
            [class.opacity-100]="isVisible"
            [class.translate-y-0]="isVisible"
            style="transition-delay: 0.4s;"
          >
            <img
              [src]="imageJpUrl"
              alt="Título Japonés"
              class="w-full h-auto"
            />
          </a>

          <a
            [routerLink]="link"
            class="hidden md:inline-block absolute left-[110px] transition-all duration-[1000ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
            [class.opacity-0]="!isVisible"
            [class.translate-x-[-30px]]="!isVisible"
            [class.opacity-100]="isVisible"
            [class.translate-x-0]="isVisible"
            [style.top.px]="topOffset"
            style="transition-delay: 0.6s;"
          >
            <span
              class="text-[0.95rem] tracking-[0.15em] font-semibold text-gray-900 uppercase"
            >
              {{ titleHorizontal }}
            </span>
          </a>
        </h2>
      </div>
    </section>
  `,
})
export class FeatureCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) imageSpUrl!: string;
  @Input({ required: true }) imageJpUrl!: string;
  @Input({ required: true }) titleHorizontal!: string;
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) link!: string;
  @Input({ required: true }) topOffset!: number;

  isVisible = false;
  private observer: IntersectionObserver | undefined;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
