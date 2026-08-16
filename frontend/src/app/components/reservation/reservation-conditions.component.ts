import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-conditions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main
      class="w-full min-h-screen bg-[#f7f7f5] pt-[60px] md:pt-[130px] md:pr-[65px] pb-[30px] md:pb-[60px] md:pl-[150px]"
    >
      <div class="w-full px-[26px] md:px-0 max-w-[800px]">
        <div
          class="flex items-center gap-x-[30px] mb-[50px] md:mb-[74px] opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
          [class.opacity-100]="isLoaded"
          [class.translate-y-0]="isLoaded"
          [class.translate-y-[20px]]="!isLoaded"
        >
          <img
            src="https://mukayu.com/wp-content/themes/corporate/img/reservation_jp.svg"
            alt=""
            aria-hidden="true"
            class="h-[68px] w-auto select-none"
          />

          <h1
            class="font-semibold text-[12px] md:text-[16px] tracking-[0.1em] uppercase text-gray-900 leading-none"
          >
            Reserva de habitaciones
          </h1>
        </div>

        <section class="mb-[100px] md:mb-[60px] font-semibold">
          <div
            class="mb-[36px] md:mb-[39px] opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
            [class.opacity-100]="isLoaded"
            [class.translate-y-0]="isLoaded"
            [class.translate-y-[20px]]="!isLoaded"
            style="transition-delay: 0.2s;"
          >
            <h2
              class="text-[15px] md:text-[18px] leading-[1.75] text-gray-900 mb-[14px]"
            >
              A tener en cuenta:
            </h2>

            <div class="mt-[14px] md:mt-[36px]">
              <h3
                class="text-[15px] md:text-[18px] leading-[1.75] tracking-[0.1em] text-gray-900 mb-[4px] md:mb-[6px] uppercase"
              >
                Política de Menores
              </h3>
              <div
                class="text-[15px] md:text-[18px] leading-[1.75] text-gray-800"
              >
                <p>No se admiten niños menores de 7 años.</p>
                <p>
                  Los niños entre 7 y 12 años son bienvenidos con una tarifa
                  especial para menores. Por favor contáctenos directamente para
                  más detalles.
                </p>
                <p>Los niños mayores de 12 años son considerados adultos.</p>
              </div>
            </div>

            <div class="mt-[36px]">
              <h3
                class="text-[15px] md:text-[18px] leading-[1.75] tracking-[0.1em] text-gray-900 mb-[4px] md:mb-[6px] uppercase"
              >
                Política de Grupos
              </h3>
              <p
                class="text-[15px] md:text-[18px] leading-[1.75] text-gray-800"
              >
                No aceptamos reservas para grupos de más de 6 personas.
              </p>
            </div>
          </div>

          <div
            class="mb-[36px] md:mb-[39px] opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
            [class.opacity-100]="isLoaded"
            [class.translate-y-0]="isLoaded"
            [class.translate-y-[20px]]="!isLoaded"
            style="transition-delay: 0.4s;"
          >
            <h2
              class="text-[13px] md:text-[16px] leading-[1.75] tracking-[0.1em] text-gray-900 mb-[4px] md:mb-[22px] uppercase"
            >
              Política de Cancelación
            </h2>

            <div
              class="text-[15px] md:text-[16px] leading-[1.6] md:leading-[1.75] text-gray-800"
            >
              <p>21 días antes: 20%</p>
              <p>14 días antes: 30%</p>
              <p>7 días antes: 50%</p>
              <p>5 días antes: 70%</p>
              <p>3 días antes de la estancia: 100%</p>
            </div>
          </div>

          <a
            routerLink="/booking-engine"
            class="block w-[260px] md:w-[350px] mt-[40px] md:mt-[45px] mb-[50px] bg-gray-900 text-white text-center py-[15px] text-[13px] tracking-[0.15em] uppercase hover:bg-gray-700 transition-colors opacity-0 duration-[800ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
            [class.opacity-100]="isLoaded"
            [class.translate-y-0]="isLoaded"
            [class.translate-y-[20px]]="!isLoaded"
            style="transition-delay: 0.6s;"
          >
            Aceptar y Continuar
          </a>
        </section>
      </div>
    </main>
  `,
})
export class ReservationConditionsComponent implements OnInit {
  isLoaded = false;

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 50);
  }
}
