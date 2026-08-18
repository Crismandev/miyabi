import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface InfoRow {
  label: string;
  value?: string;
  isHtml?: boolean;
  nestedList?: { term: string; desc: string }[];
  note?: string;
}

@Component({
  selector: 'app-room-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="w-full px-[26px] mb-[150px] md:flex md:justify-start md:mb-[200px] md:px-0"
    >
      <h2
        class="relative mb-[24px] pb-[10px] text-[18px] text-gray-900 font-medium leading-[2] transition-all duration-[800ms] delay-[300ms] ease-[cubic-bezier(.39,.575,.565,1)] md:text-[20px] md:tracking-[0.05em] md:mb-[30px] md:mr-[85px] md:min-w-[340px] md:max-w-[340px] md:w-[340px] md:shrink-0"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        {{ title }}
      </h2>

      <dl
        class="w-full md:flex-1 border-t border-[#000] tracking-[0.025em] md:tracking-[0.05em] text-gray-800 transition-all duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        <div
          *ngFor="let row of infoData"
          class="py-[27px] border-b border-[#282828] text-[14px] md:flex md:pt-[25px] md:pb-[28px] md:px-0"
        >
          <dt
            class="font-bold text-black leading-[1.85] mb-[15px] md:w-[220px] md:mb-0 md:shrink-0 md:self-center"
          >
            {{ row.label }}
          </dt>

          <dd
            class="leading-[2.15] md:w-[calc(100%-220px)] md:leading-[2] text-right"
          >
            <div
              *ngIf="row.value && !row.isHtml"
              class="font-medium text-black"
            >
              {{ row.value }}
            </div>

            <div *ngIf="row.value && row.isHtml" [innerHTML]="row.value"></div>

            <dl
              *ngIf="row.nestedList"
              class="w-full flex flex-col items-end mt-[10px] mb-[-10px] md:mt-[15px] md:mb-[-15px]"
            >
              <div
                *ngFor="let item of row.nestedList"
                class="flex justify-end items-baseline gap-4 mb-[10px] md:mb-[15px] w-full text-right"
              >
                <dt class="font-medium text-black text-right whitespace-nowrap">
                  {{ item.term }}
                </dt>
                <dd class="font-medium text-black text-right whitespace-nowrap">
                  {{ item.desc }}
                </dd>
              </div>
            </dl>

            <p
              *ngIf="row.note"
              class="mt-[15px] md:mt-[35px] font-medium text-right text-[13px] md:text-[14px] leading-[2] text-black"
            >
              {{ row.note }}
            </p>
          </dd>
        </div>
      </dl>
    </section>
  `,
})
export class RoomInfoComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Información de la habitación';
  @Input({ required: true }) infoData: InfoRow[] = [];

  isVisible = signal<boolean>(false);
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
}
