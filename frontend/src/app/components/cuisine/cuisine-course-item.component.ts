import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Course {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-cuisine-course-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-[90px] md:mb-[95px] block md:flex md:justify-start">
      <h2
        class="relative mr-[70px] md:mr-[130px] mb-[40px] md:min-w-[340px] md:max-w-[340px] text-[1.25rem] leading-8 font-medium transition-all duration-[600ms] ease-[cubic-bezier(.39,.575,.565,1)]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        {{ course.title }}
        <span
          class="absolute bottom-[-20px] left-0 w-[35px] h-[1px] bg-[#707070] md:hidden"
        ></span>
      </h2>

      <div
        class="transition-all duration-[600ms] delay-[400ms] ease-[cubic-bezier(.39,.575,.565,1)] md:w-[59%]"
        [class.opacity-0]="!isVisible()"
        [class.translate-y-[25px]]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.translate-y-0]="isVisible()"
      >
        <div
          class="w-full font-medium text-[0.875rem] md:text-[1rem] leading-[2] text-justify md:mt-[-11px] text-gray-800"
        >
          <p
            *ngFor="let item of course.items"
            class="mb-10 last:mb-0"
            [innerHTML]="item"
          ></p>
        </div>
      </div>
    </div>
  `,
})
export class CuisineCourseItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) course!: Course;

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
      { threshold: 0.15 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
