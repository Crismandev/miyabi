import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ElementRef,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface AnchorItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-anchor-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="hidden md:block fixed top-1/2 -translate-y-1/2 left-[25px] z-50 transition-all duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)]"
      [class.opacity-0]="!activeId() || !isVisible()"
      [class.opacity-100]="activeId() && isVisible()"
      [class.pointer-events-none]="!activeId()"
    >
      <div class="relative">
        <ul class="flex flex-col">
          <li
            *ngFor="let item of items"
            class="relative w-[30px] h-[30px] transition-all duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)] cursor-pointer group"
            [class.opacity-20]="activeId() !== item.id"
            [class.opacity-100]="activeId() === item.id"
            (click)="scrollTo(item.id)"
          >
            <div
              class="absolute top-0 left-0 w-[0.5px] h-full bg-[#000] transition-all duration-[400ms]"
              [class.group-hover:translate-x-[1px]]="activeId() !== item.id"
              [class.w-[1px]]="activeId() === item.id"
              [class.bg-black]="activeId() === item.id"
            ></div>

            <div
              class="absolute top-1/2 -translate-y-1/2 left-[8px] opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(.39,.575,.565,1)] group-hover:opacity-100 group-hover:translate-x-[2px] w-[105px] overflow-hidden"
              [class.opacity-100]="activeId() === item.id"
              [class.translate-x-[2px]]="activeId() === item.id"
            >
              <span
                class="block text-[10px] uppercase tracking-[0.12em] text-gray-900 font-medium leading-[1.2] line-clamp-2"
              >
                {{ item.label }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class AnchorNavComponent implements OnInit, OnDestroy {
  @Input({ required: true }) items: AnchorItem[] = [];

  activeId = signal<string>('');
  isVisible = signal<boolean>(false);

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      setTimeout(() => this.isVisible.set(true), 500);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    const visibleEntries = new Set<string>();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleEntries.add(entry.target.id);
        } else {
          visibleEntries.delete(entry.target.id);
        }
      });

      if (visibleEntries.size > 0) {
        const activeItem = this.items.find((item) =>
          visibleEntries.has(item.id),
        );
        if (activeItem) {
          this.activeId.set(activeItem.id);
        }
      } else {
        this.activeId.set('');
      }
    }, options);

    setTimeout(() => {
      this.items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          this.observer?.observe(element);
        }
      });
    }, 100);
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
