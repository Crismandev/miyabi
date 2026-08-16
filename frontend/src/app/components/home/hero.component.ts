import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Contenedor Principal -->
    <section
      class="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden bg-[#1a1a1a]"
      style="background-image: url('https://mukayu.com/wp-content/themes/corporate/img/index/hero_img.jpg');"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/10"></div>

      <!-- Certificaciones -->
      <div
        class="absolute top-[20px] left-[20px] md:top-[30px] md:left-[40px] flex items-center gap-4 md:gap-[25px] z-10 opacity-0 animate-fade-in"
        style="animation-delay: 1.6s;"
      >
        <a
          href="https://www.relaischateaux.com/us/japan/beniya-ishikawa-ken-kaga-shi"
          target="_blank"
          class="h-[45px] md:h-[58px] hover:opacity-70 transition-opacity"
        >
          <img
            class="h-full w-auto"
            src="https://mukayu.com/wp-content/themes/corporate/img/index/logoRC-w.svg"
            alt="Relais & Châteaux"
          />
        </a>
        <a
          href="https://guide.michelin.com/jp/en/hotels"
          target="_blank"
          class="h-[45px] md:h-[58px] hover:opacity-70 transition-opacity"
        >
          <img
            class="h-full w-auto"
            src="https://mukayu.com/wp-content/themes/corporate/img/index/logoMichelin2025-w.svg"
            alt="Michelin Guide"
          />
        </a>
      </div>

      <!-- Contenedor Central -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <!-- Logo Central -->
        <div
          class="w-[200px] h-[60px] sm:w-[302px] sm:h-[91px] md:w-[500px] md:h-[151px] opacity-0 animate-fade-in relative"
          style="animation-delay: 1s;"
        >
          <img
            class="w-full h-full object-contain"
            src="https://mukayu.com/wp-content/themes/corporate/img/index/hero_logo.svg"
            alt="Miyabi Ryokan Logo"
          />

          <!-- Título -->
          <div
            class="absolute top-full mt-8 md:mt-16 left-1/2 md:left-auto md:right-[-40px] transform -translate-x-1/2 md:translate-x-full opacity-0 animate-fade-in flex flex-col items-center md:items-end"
            style="animation-delay: 1.6s;"
          >
            <img
              class="w-[100px] md:w-[140px] h-auto mb-3 md:mb-4"
              src="https://mukayu.com/wp-content/themes/corporate/img/index/hero_jp.svg"
              alt="べにや 無何有"
            />
            <img
              class="w-[170px] md:w-[240px] h-auto"
              src="https://mukayu.com/wp-content/themes/corporate/img/index/hero_en.svg"
              alt="BENIYA MUKAYU"
            />
          </div>
        </div>
      </div>

      <!-- Flecha de Scroll -->
      <div
        class="absolute bottom-[50px] md:bottom-[60px] left-0 right-0 mx-auto w-[20px] h-[20px] md:w-[30px] md:h-[30px] border-l border-b border-[#f7f7f5] -rotate-45 z-10 opacity-0 animate-arrow-bounce cursor-pointer pointer-events-auto"
        style="animation-delay: 2.6s;"
      ></div>
    </section>
  `,
  styles: [
    `
      @keyframes fadeInHero {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .animate-fade-in {
        animation: fadeInHero 1.6s cubic-bezier(0.39, 0.575, 0.565, 1) forwards;
      }

      @keyframes arrowBounce {
        0% {
          opacity: 1;
          transform: translate3d(0, -6px, 0) rotate(-45deg);
        }
        50% {
          opacity: 1;
          transform: translate3d(0, 6px, 0) rotate(-45deg);
        }
        100% {
          opacity: 1;
          transform: translate3d(0, -6px, 0) rotate(-45deg);
        }
      }

      .animate-arrow-bounce {
        animation: arrowBounce 1.6s ease-out infinite forwards;
      }
    `,
  ],
})
export class HeroComponent {}
