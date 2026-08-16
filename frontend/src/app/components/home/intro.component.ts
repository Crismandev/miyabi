import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="w-full flex flex-col md:flex-row-reverse justify-end mb-[150px] md:mb-[200px]"
    >
      <!-- Contenedor Derecho -->
      <div
        class="w-full md:overflow-hidden min-[1400px]:min-w-[755px] relative z-0 flex justify-center"
      >
        <img
          src="https://mukayu.com/wp-content/themes/corporate/img/index/concept_img.jpg"
          alt="Minimalist Plant"
          class="w-full md:w-[755px] md:max-w-none min-[1400px]:w-full h-auto object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
          [class.translate-x-0]="isLoaded"
          [class.-translate-x-[50px]]="!isLoaded"
        />
      </div>

      <!-- Contenedor Izquierdo -->
      <div
        class="w-full md:w-[460px] px-[26px] md:px-0 md:mr-[80px] shrink-0 flex flex-col items-start z-10 pt-10 md:pt-0"
      >
        <!-- Título -->
        <h1
          class="w-fit mt-[65px] mb-[35px] font-garamond opacity-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
          [class.opacity-100]="isLoaded"
          style="transition-delay: 0.4s;"
        >
          <!-- Línea 1 -->
          <div class="flex items-baseline gap-3 text-[#333] whitespace-nowrap">
            <span class="text-[1.6rem] md:text-[1.8rem] tracking-wide"
              >Miyabi</span
            >
            <span
              class="text-[1.4rem] md:text-[1.5rem] tracking-[0.15em] uppercase"
              >R Y O K A N</span
            >
          </div>

          <!-- Línea 2 -->
          <div class="flex items-center justify-end mt-2 text-[#555]">
            <span
              class="inline-block w-[60px] h-[1px] bg-[#707070] mr-4"
            ></span>
            <span
              class="text-[1rem] md:text-[1.1rem] tracking-widest lowercase italic"
              >richness in emptiness</span
            >
          </div>
        </h1>

        <!-- Texto Descriptivo -->
        <div
          class="text-[1.05rem] md:text-[1.1rem] leading-[1.6] text-justify text-[#333] font-semibold opacity-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
          [class.opacity-100]="isLoaded"
          style="transition-delay: 0.8s;"
        >
          <p>
            “Una habitación vacía se llenará de luz precisamente por su vacío”.
            Estas palabras pertenecen al filósofo Zhuangzi, escritas hace más de
            dos mil trescientos años, y expresan que la mente libre habita en el
            espacio de la quietud. De su pensamiento surge el concepto de
            MIYABI: la búsqueda de la belleza en la sobriedad, lo no premeditado
            y la autenticidad de la naturaleza en su estado más puro. En esta
            filosofía, las convenciones cotidianas se transforman, revelando un
            valor profundo en aquello que suele pasarse por alto. Como aquel
            viejo árbol inclinado junto al camino que, al no servir para madera
            comercial, jamás fue talado y hoy ofrece una generosa sombra a los
            viajeros cansados. Así concebimos cada espacio en nuestro ryokan:
            instantes de silencio y tiempo libre de prisas, donde la ausencia de
            artificios se convierte en auténtica plenitud para el espíritu.
          </p>
        </div>

        <!-- Autor -->
        <p
          class="text-[0.925rem] md:text-[1rem] mt-[30px] font-semibold tracking-wide text-[#000] opacity-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
          [class.opacity-100]="isLoaded"
          style="transition-delay: 0.8s;"
        >
          Kiyoshi Sey Takeyama | Arquitecto
        </p>

        <!-- Botón de Video -->
        <div
          (click)="openModal()"
          class="mt-[60px] md:mt-[30px] w-[120px] md:w-[130px] cursor-pointer hover:opacity-70 transition-all duration-[800ms] ease-[cubic-bezier(0.39,0.575,0.565,1)] opacity-0"
          [class.opacity-100]="isLoaded"
          style="transition-delay: 1.6s;"
        >
          <img
            src="https://mukayu.com/wp-content/themes/corporate/img/index/move_btn_en.svg"
            alt="Play Video"
            class="w-full h-auto"
          />
        </div>
      </div>
    </section>

    <!-- ── MODAL DE VIDEO ────────────── -->
    <div
      class="fixed inset-0 w-full h-full z-[100] transition-opacity duration-[600ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
      [class.opacity-0]="!isModalOpen"
      [class.pointer-events-none]="!isModalOpen"
      [class.opacity-100]="isModalOpen"
      [class.pointer-events-auto]="isModalOpen"
    >
      <div
        class="absolute inset-0 w-full h-full bg-black/90 z-[31]"
        (click)="closeModal()"
      ></div>

      <button
        class="absolute top-[20px] right-[20px] md:top-[45px] md:right-[120px] w-[20px] h-[20px] z-[32] cursor-pointer hover:opacity-60 transition-opacity"
        (click)="closeModal()"
      >
        <span
          class="absolute inset-0 m-auto w-full h-[2px] bg-[#f7f7f5] rotate-45"
        ></span>
        <span
          class="absolute inset-0 m-auto w-full h-[2px] bg-[#f7f7f5] -rotate-45"
        ></span>
      </button>

      <div
        class="absolute inset-0 m-auto w-full max-w-6xl px-4 md:px-[120px] flex items-center justify-center z-[33] pointer-events-none"
      >
        <div class="w-full aspect-video pointer-events-auto shadow-2xl">
          <iframe
            *ngIf="isModalOpen"
            class="w-full h-full"
            frameborder="0"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            title="YouTube video player"
            src="https://www.youtube.com/embed/?enablejsapi=1&origin=https%3A%2F%2Fmukayu.com&widgetid=1&forigin=https%3A%2F%2Fmukayu.com%2Fenglish%2F&aoriginsup=1&gporigin=https%3A%2F%2Fwww.google.com%2F&vf=4&autoplay=1"
          ></iframe>
        </div>
      </div>
    </div>
  `,
})
export class IntroComponent implements OnInit {
  isModalOpen = false;
  isLoaded = false;

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}
