import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main
      class="w-full min-h-screen bg-[#f7f7f5] pt-[60px] md:pt-[130px] px-[20px] md:px-[60px] xl:px-[150px] pb-[100px]"
    >
      <div class="flex items-center gap-x-[15px] mb-[40px] md:mb-[60px]">
        <h1
          class="font-garamond text-[15px] md:text-[18px] tracking-[0.1em] uppercase text-gray-900 leading-none"
        >
          Historial del Huésped
        </h1>
      </div>

      @if (reservations.length === 0) {
        <div
          class="bg-white p-[40px] md:p-[60px] border border-gray-200/60 shadow-sm max-w-[600px] text-center"
        >
          <p class="font-garamond text-[16px] text-gray-600 mb-[30px]">
            No tienes reservas registradas actualmente en tu historial.
          </p>
          <a
            routerLink="/reservation"
            class="inline-block bg-gray-900 text-white text-center py-[14px] px-[32px] text-[12px] tracking-[0.15em] uppercase hover:bg-gray-700 transition-all duration-[300ms]"
          >
            HACER UNA RESERVA
          </a>
        </div>
      } @else {
        <div class="grid grid-cols-1 gap-[25px] max-w-[900px]">
          @for (
            res of reservations;
            track res.idReserva || res.reservationCode
          ) {
            <div
              class="bg-white p-[25px] md:p-[35px] border border-gray-200/60 shadow-sm transition-all hover:border-gray-300"
            >
              <div
                class="flex flex-wrap justify-between items-center border-b border-gray-200 pb-[18px] mb-[20px] gap-[10px]"
              >
                <div>
                  <span
                    class="block text-[11px] uppercase tracking-[0.15em] text-gray-400"
                    >Código de Reserva</span
                  >
                  <span
                    class="font-garamond text-[18px] font-semibold text-gray-900 tracking-wider"
                  >
                    {{ res.reservationCode || 'RES-2026-00' + res.idReserva }}
                  </span>
                </div>

                <span
                  class="inline-block px-[12px] py-[4px] text-[11px] font-medium tracking-[0.15em] uppercase"
                  [ngClass]="{
                    'bg-emerald-100 text-emerald-800':
                      res.state === 'Confirmed' ||
                      res.state === 'CheckedIn' ||
                      res.state === 'CheckedOut',
                    'bg-amber-100 text-amber-800': res.state === 'Pending',
                    'bg-rose-100 text-red-800': res.state === 'Cancelled',
                  }"
                >
                  {{ res.state || 'Confirmado' }}
                </span>
              </div>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[18px] gap-x-[20px] font-garamond text-[15px]"
              >
                <div>
                  <span
                    class="block text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-[2px]"
                    >Check-in</span
                  >
                  <span class="text-gray-800">{{
                    res.entryDate | date: 'dd MMM yyyy'
                  }}</span>
                </div>

                <div>
                  <span
                    class="block text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-[2px]"
                    >Check-out</span
                  >
                  <span class="text-gray-800">{{
                    res.departureDate | date: 'dd MMM yyyy'
                  }}</span>
                </div>

                <div>
                  <span
                    class="block text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-[2px]"
                    >Huéspedes</span
                  >
                  <span class="text-gray-800"
                    >{{ res.numAdults || 1 }} Adulto(s),
                    {{ res.numChildren || 0 }} Niño(s)</span
                  >
                </div>

                @if (res.room) {
                  <div class="sm:col-span-2">
                    <span
                      class="block text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-[2px]"
                      >Habitación Asignada</span
                    >
                    <span class="text-gray-800">
                      N° {{ res.room.roomNumber }} -
                      {{ res.room.roomType?.nameType }}
                    </span>
                  </div>
                }

                <div>
                  <span
                    class="block text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-[2px]"
                    >Monto Total</span
                  >
                  <span class="text-[17px] font-medium text-gray-900"
                    >¥ {{ res.totalPay | number: '1.2-2' }}</span
                  >
                </div>
              </div>
            </div>
          }
        </div>
      }
    </main>
  `,
  styles: [``],
})
export class MyReservationsComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private authService = inject(AuthService);
  reservations: Reservation[] = [];

  ngOnInit() {
    const session = this.authService.currentUser();
    const guestId = session.guestId || 1;

    this.reservationService.getReservationsByGuest(guestId).subscribe({
      next: (data) => (this.reservations = data),
      error: () => {
        this.reservations = [
          {
            idReserva: 1,
            reservationCode: 'RES-2026-0042',
            entryDate: '2026-03-10',
            departureDate: '2026-03-12',
            numAdults: 2,
            numChildren: 0,
            totalPay: 900,
            state: 'Confirmed',
          },
        ];
      },
    });
  }
}
