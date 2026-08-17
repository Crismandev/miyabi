import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-policy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="w-full px-[26px] mb-[150px] md:flex md:justify-start md:mb-[200px] md:px-0"
    >
      <h2
        class="relative mb-[24px] pb-[10px] text-[18px] text-gray-900 font-medium leading-[2] md:text-[20px] md:tracking-[0.05em] md:mb-[30px] md:mr-[85px] md:w-[340px] md:min-w-[340px] md:max-w-[340px] md:shrink-0 md:self-start transition-all duration-[800ms] delay-[400ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        {{ title }}
      </h2>

      <div
        class="w-full md:flex-1 border-y border-[#2c2c2c] py-[22px] md:py-[28px] tracking-[0.025em] md:tracking-[0.05em] text-black transition-all duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        <ul class="w-full space-y-[12px] md:space-y-[16px]">
          <li
            *ngFor="let policy of policies"
            class="font-medium text-[14px] leading-[2] text-right"
            [innerHTML]="policy"
          ></li>
        </ul>
      </div>
    </section>
  `,
})
export class RoomPolicyComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Attention';
  @Input({ required: true }) policies: string[] = [];

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
