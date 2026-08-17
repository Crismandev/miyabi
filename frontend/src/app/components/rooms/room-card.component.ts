import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Room {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  drawingImage?: string;
  planEn: string;
  features: string[];
  images: string[];
}

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section
      [id]="room.id"
      class="w-full mb-[150px] md:mb-[200px] block md:flex md:flex-row-reverse md:items-stretch"
    >
      <div
        (click)="nextImage()"
        class="relative w-full md:flex-1 md:flex md:flex-col overflow-hidden cursor-pointer select-none transition-all duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        <ul
          class="relative w-full h-[250px] md:h-auto md:flex-1 md:min-h-[500px] list-none"
        >
          <li
            *ngFor="let img of room.images; let i = index"
            class="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            [class.opacity-100]="i === currentIndex()"
            [class.opacity-0]="i !== currentIndex()"
          >
            <img
              [src]="img"
              [alt]="room.title"
              class="w-full h-full object-cover"
            />
          </li>
        </ul>
      </div>

      <div
        class="px-[26px] md:px-0 md:mr-[85px] md:w-[370px] md:shrink-0 mt-[40px] md:mt-0"
      >
        <h2
          class="tracking-[0.045em] leading-[1.7] mb-[32px] text-[20px] font-semibold text-gray-900 relative transition-all duration-[800ms] delay-[300ms] ease-[cubic-bezier(.39,.575,.565,1)]"
          [class.opacity-0]="!isVisible()"
          [class.translate-y-[25px]]="!isVisible()"
          [class.opacity-100]="isVisible()"
          [class.translate-y-0]="isVisible()"
        >
          {{ room.title }}
          <span class="block text-[14px] font-medium text-black mt-2">{{
            room.subtitle
          }}</span>

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
              class="text-[13px] md:text-[14px] font-semibold leading-[1.4] md:leading-[1.6] tracking-[1px] text-gray-800"
              [innerHTML]="room.description"
            ></p>
          </div>

          <div class="mb-[40px]">
            <div *ngIf="room.drawingImage" class="w-[100%] mb-[20px]">
              <img
                [src]="room.drawingImage"
                [alt]="room.title + ' plan'"
                class="w-full h-auto object-contain"
              />
            </div>

            <p
              class="italic leading-[1.4] text-[15px] md:text-[14px] font-semibold text-black mb-[24px]"
            >
              {{ room.planEn }}
            </p>

            <ul
              class="leading-[2] text-[14px] md:tracking-[0.03em] md:leading-[1.65] text-black space-y-1"
            >
              <li
                *ngFor="let feature of room.features"
                class="flex items-start gap-1"
              >
                <span class="select-none">◎</span>
                <span class="font-medium">{{ feature }}</span>
              </li>
            </ul>
          </div>

          <a
            routerLink="/reservation"
            class="block w-[210px] h-[38px] md:w-[250px] md:h-[45px]"
          >
            <div
              class="w-full h-full border border-[#222] rounded flex justify-center items-center text-black uppercase tracking-[0.15em] text-[14px] hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
            >
              RESERVAR HABITACION
            </div>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class RoomCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) room!: Room;

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
    if (this.room?.images?.length > 1) {
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
    if (this.room?.images?.length > 1) {
      this.advanceImage();
      this.startTimer();
    }
  }

  private advanceImage(): void {
    this.currentIndex.update((idx) => (idx + 1) % this.room.images.length);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.observer?.disconnect();
  }
}
