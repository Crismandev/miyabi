import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spa-reserve',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="border-t border-black pt-[80px] md:pt-[120px] pb-[100px] md:pb-[150px] px-[26px] md:px-0 md:flex transition-all duration-[800ms] ease-[cubic-bezier(.39,.575,.565,1)]"
      [ngClass]="{
        'opacity-0 translate-y-[25px]': !isVisible(),
        'opacity-100 translate-y-0': isVisible(),
      }"
    >
      <h2
        class="relative mb-[30px] pb-[10px] text-[18px] md:text-[20px] font-semibold text-gray-900 md:leading-[1.75] md:shrink-0 md:w-[370px] md:mr-[85px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#707070] md:after:hidden"
      >
        Acerca de las reservas
      </h2>

      <div class="md:max-w-[722px]">
        <div
          class="mt-[30px] md:mt-0 text-justify text-[13px] md:text-[16px] leading-[2] font-medium text-black space-y-[15px]"
        >
          <p>
            10:00 A.M.–2:00 P.M.<br />
            (Por favor, realice su reserva antes de las 7:00 P.M. del día
            anterior).
          </p>

          <p>
            2:00 P.M. – 10:00 P. M. <br />
            (Por favor, realice su reserva antes de las 7:00 P.M. del mismo
            día).
          </p>

          <p>
            ◎ Por favor, realice su reserva con anticipación para asegurar sus
            tratamientos.<br />
            ◎ Los servicios de tratamiento también están disponibles para
            huéspedes antes del check-in, después del check-out y para
            visitantes externos.<br />
            ◎ Las cancelaciones realizadas dentro de las 24 horas previas a la
            cita tendrán un cargo del 50%, y dentro de las 12 horas o en caso de
            no presentarse, se aplicará un cargo del 100%.<br />
            ◎ Si tiene alergias o cualquier otra inquietud médica, por favor
            infórmenos al hacer su reserva.<br />
            Por favor, comprenda que puede haber casos en los que debamos
            rechazar la prestación de los servicios según sus condiciones de
            salud.<br />
            ◎ Si está embarazada, por favor infórmenos al realizar su
            reserva.<br />
            ◎ Lamentablemente, su tiempo de tratamiento podría acortarse si
            llega tarde a su reserva.<br />
            ◎ Los tratamientos están disponibles para personas de 16 años o
            más.<br />
            ◎ Por favor, absténgase de asistir con niños.
          </p>

          <p>
            ◎ Los precios mencionados anteriormente incluyen todos los
            impuestos.
          </p>
        </div>

        <p
          class="relative w-fit text-[32px] md:text-[40px] text-black font-medium after:content-[''] after:absolute after:bottom-[4px] after:left-0 after:w-full after:h-[2px] after:bg-black transition-all duration-300 cursor-pointer"
        >
          <span
            class="block text-[13px] md:text-[16px] leading-[2] mt-[44px] mb-[24px] md:mt-[64px] md:mb-[0px] text-black font-medium"
          >
            Hacer una consulta
          </span>
          <a href="mailto:reservas@miyabi.com" class="block pb-[5px]"
            >reservas&#64;miyabi.com</a
          >
        </p>
      </div>
    </section>
  `,
})
export class SpaReserveComponent implements OnInit, OnDestroy {
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
