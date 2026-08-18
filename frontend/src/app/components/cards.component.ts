import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardData {
  id: string;
  title: string;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      [id]="data.id"
      class="w-full mb-[150px] md:mb-[200px] mt-[100px] md:mt-[150px] block md:flex md:flex-row-reverse md:items-stretch"
    >
      <div
        (click)="nextImage()"
        class="relative w-full min-h-[250px] md:min-h-[100vh] md:flex-1 overflow-hidden cursor-pointer select-none transition-all duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
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

      <div
        class="px-[26px] md:px-0 md:mr-[85px] md:w-[370px] md:shrink-0 mt-[40px] md:mt-0 md:pt-[60px]"
      >
        <h2
          class="tracking-[0.045em] leading-[1.7] mb-[32px] text-[22px] font-semibold text-gray-900 relative transition-all duration-[800ms] delay-[300ms] ease-[cubic-bezier(.39,.575,.565,1)]"
          [class.opacity-0]="!isVisible()"
          [class.translate-y-[25px]]="!isVisible()"
          [class.opacity-100]="isVisible()"
          [class.translate-y-0]="isVisible()"
        >
          {{ data.title }}

          <span class="block w-[40px] h-[1px] bg-black mt-[17px]"></span>
        </h2>

        <div
          class="transition-all duration-[800ms] delay-[600ms] ease-[cubic-bezier(.39,.575,.565,1)]"
          [class.opacity-0]="!isVisible()"
          [class.translate-y-[25px]]="!isVisible()"
          [class.opacity-100]="isVisible()"
          [class.translate-y-0]="isVisible()"
        >
          <div class="mb-[30px]">
            <p
              class="text-[13px] md:text-[16px] font-semibold leading-[1.4] md:leading-[1.6] tracking-[1px] text-gray-800"
              [innerHTML]="data.description"
            ></p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: CardData;

  currentIndex = signal<number>(0);
  isVisible = signal<boolean>(false);
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
