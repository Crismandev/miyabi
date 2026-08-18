import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="block md:flex md:items-start w-full">
      <div
        class="my-[80px] mb-[100px] px-[26px] md:my-[100px] md:mb-[150px] md:px-0 md:min-w-[340px] md:max-w-[370px] md:mr-[50px] md:block md:relative transition-all duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        <img
          *ngIf="sideImageJp"
          [src]="sideImageJp"
          alt="Japanese decoration"
          class="hidden md:inline-block w-[20px]"
        />

        <h1
          class="hidden md:inline-block absolute top-[20px] left-[50px] text-[20px] tracking-widest font-semibold"
        >
          {{ headerTitle }}
        </h1>
      </div>

      <div
        class="flex-1 flex justify-center items-center my-[60px] md:my-[80px] md:pr-0 lg:pr-0 xl:pr-[80px] 2xl:pr-[420px] md:mt-[80px] lg:mt-[120px] xl:mt-[180px] 2xl:mt-[225px] transition-all duration-[800ms] delay-[300ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        <p
          class="mx-auto w-full max-w-[323px] md:max-w-[500px] lg:max-w-[650px] xl:max-w-[700px] text-left text-[13px] md:text-[15px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[1.6] md:leading-[1.8] tracking-[1px] font-semibold text-gray-800 transition-all duration-[600ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        >
          {{ conceptText }}
        </p>
      </div>
    </section>
  `,
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  @Input() sideImageJp: string = '';
  @Input() headerTitle: string = '';
  @Input() conceptText: string = '';

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
