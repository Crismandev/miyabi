import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer
      class="mx-auto border-t border-[#707070] pt-[20px] pb-[40px] md:pt-[50px] md:pb-[125px] bg-[#f7f7f5] w-[calc(100%-52px)] md:w-[calc(100%-200px)]"
    >
      <div
        class="flex flex-col md:flex-row md:justify-between max-w-[1200px] mx-auto md:px-[20px]"
      >
        <div class="mb-10 md:mb-0">
          <div class="mb-[30px]">
            <a routerLink="/" class="inline-block w-[260px]  ">
              <img
                src="img/logo.png"
                alt="Miyabi Ryokan"
                class="w-full h-auto"
              />
            </a>

            <div class="flex md:hidden gap-5 mt-[20px]">
              <a href="#" target="_blank" class="h-[52px]  ">
                <img
                  src="https://mukayu.com/wp-content/themes/corporate/img/relais_logo.svg"
                  alt="Relais & Chateaux"
                  class="h-full w-auto"
                />
              </a>
              <a href="#" target="_blank" class="h-[52px]  ">
                <img
                  src="https://mukayu.com/wp-content/themes/corporate/img/index/logoMichelin2025.svg"
                  alt="Michelin"
                  class="h-full w-auto"
                />
              </a>
            </div>
          </div>

          <div class="mb-[40px] md:mb-[20px] leading-[1.5]">
            <p class="text-[13px] text-gray-900 font-serif tracking-wide">
              MIYABI RYOKAN
            </p>
            <p class="text-[13px] text-gray-900 font-serif tracking-wide mt-1">
              55-1-3 Yamashiro Onsen, Kaga, Ishikawa<br />
              922-0242 Japan
            </p>
            <a
              href="https://goo.gl/maps/MnFjxQjdAGcWupCU7"
              target="_blank"
              class="inline-block relative mt-[15px] text-[16px] text-gray-900 hover:text-gray-500 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#707070]"
            >
              Google Map
            </a>
          </div>

          <div class="leading-[1.5] flex flex-col font-serif text-gray-900">
            <a
              href="tel:+81-(0)761-77-1340"
              class="text-[37px] md:text-[30px] mb-[15px]  "
            >
              +81-(0)761-77-1340
            </a>
            <p class="text-[16px]">FAX : +81-(0)761-76-1340</p>
            <a href="mailto:reservas@miyabi.com" class="text-[16px]  ">
              E-mail : reservas&#64;miyabi.com
            </a>
          </div>
        </div>

        <div class="mb-10 md:mb-0">
          <h3
            class="text-[12px] md:text-[19px] text-[#282828] md:text-black tracking-[1.9px] mb-[15px] md:mb-[20px] uppercase"
          >
            Premios
          </h3>
          <ul
            class="mb-[40px] leading-[1.8] md:leading-[2] tracking-[1.4px] font-semibold text-[10px] text-gray-800"
          >
            <li>PREMIO AUTÉNTICO DE HOTELES Y CRUCEROS 2015</li>
            <li>MEJOR SPA DE HOTEL PEQUEÑO DEL MUNDO 2015</li>
            <li>Trofeo de Bienvenida RELAIS & CHATEAUX 2013</li>
            <li>PREMIOS SPA JAPAN CRYSTAL PROFESIONALES 2012</li>
          </ul>

          <div class="hidden md:flex items-center gap-[30px] mb-[50px]">
            <a
              href="#"
              target="_blank"
              class="w-[60px] h-[65px] flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <img
                src="https://mukayu.com/wp-content/themes/corporate/img/relais_logo.svg"
                alt="Relais"
                class="max-h-full max-w-full object-contain"
              />
            </a>
            <a
              href="#"
              target="_blank"
              class="w-[85px] h-[65px] flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <img
                src="https://mukayu.com/wp-content/themes/corporate/img/index/logoMichelin2025.svg"
                alt="Michelin"
                class="max-h-full max-w-full object-contain"
              />
            </a>
          </div>

          <p
            class="hidden md:block text-[12px] tracking-[1.4px] font-semibold text-gray-900 uppercase"
          >
            MIYABI. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>

        <div class="md:w-[295px]">
          <h3
            class="block md:hidden text-[12px] tracking-[1.9px] mb-[15px] text-[#282828] uppercase"
          >
            Links
          </h3>

          <ul
            class="mb-[40px] md:mb-[27px] text-[14px] font-medium text-gray-900"
          >
            <li
              class="relative py-[20px] border-t border-[#707070] tracking-[1.4px] group"
            >
              <a href="#" target="_blank" class="block w-full h-full"
                >TIENDA ONLINE</a
              >
              <span
                class="absolute right-[3px] top-0 bottom-0 my-auto w-[10px] h-[10px] border-r border-b border-[#707070] -rotate-45 pointer-events-none"
              ></span>
            </li>
            <li
              class="relative py-[20px] border-t border-[#707070] tracking-[1.4px] group"
            >
              <a href="#" target="_blank" class="block w-full h-full"
                >CARRERAS</a
              >
              <span
                class="absolute right-[3px] top-0 bottom-0 my-auto w-[10px] h-[10px] border-r border-b border-[#707070] -rotate-45 pointer-events-none"
              ></span>
            </li>
            <li
              class="relative py-[20px] border-t border-[#707070] tracking-[1.4px] group"
            >
              <a href="#" target="_blank" class="block w-full h-full"
                >RELAIS & CHATEAUX</a
              >
              <span
                class="absolute right-[3px] top-0 bottom-0 my-auto w-[10px] h-[10px] border-r border-b border-[#707070] -rotate-45 pointer-events-none"
              ></span>
            </li>
            <li
              class="relative py-[20px] border-t border-[#707070] tracking-[1.4px] group"
            >
              <a href="#" target="_blank" class="block w-full h-full"
                >AMORPHE / Kiyoshi Sey Takeyama</a
              >
              <span
                class="absolute right-[3px] top-0 bottom-0 my-auto w-[10px] h-[10px] border-r border-b border-[#707070] -rotate-45 pointer-events-none"
              ></span>
            </li>
            <li
              class="relative py-[20px] border-t border-b border-[#707070] tracking-[1.4px] group"
            >
              <a href="#" target="_blank" class="block w-full h-full"
                >Hara Design Institute / Kenya Hara</a
              >
              <span
                class="absolute right-[3px] top-0 bottom-0 my-auto w-[10px] h-[10px] border-r border-b border-[#707070] -rotate-45 pointer-events-none"
              ></span>
            </li>
          </ul>

          <div
            class="md:flex md:justify-between md:items-center md:flex-row-reverse w-full"
          >
            <ul class="mb-[30px] md:mb-0 md:mr-[70px] flex gap-[10px]">
              <li class="w-[30px] md:w-[45px]">
                <a href="#" target="_blank" class="block">
                  <img
                    src="https://mukayu.com/wp-content/themes/corporate/img/instagram_icon.svg"
                    alt="Instagram"
                    class="w-full"
                  />
                </a>
              </li>
              <li class="w-[30px] md:w-[45px]">
                <a href="#" target="_blank" class="block">
                  <img
                    src="https://mukayu.com/wp-content/themes/corporate/img/facebook_icon.svg"
                    alt="Facebook"
                    class="w-full"
                  />
                </a>
              </li>
            </ul>
          </div>

          <p
            class="block md:hidden text-[10px] tracking-[1.4px] text-gray-900 uppercase mt-8"
          >
            MIYABI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
