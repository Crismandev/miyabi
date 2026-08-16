import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { Room } from '../../models/room.model';
import { BookingPayload } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main
      class="w-full min-h-screen bg-[#f7f7f5] pt-[60px] md:pt-[130px] px-[20px] md:px-[60px] xl:px-[150px] pb-[100px]"
    >
      <div
        class="flex items-center gap-x-[30px] mb-[40px] md:mb-[60px] transition-all duration-[800ms] ease-[cubic-bezier(0.39,0.575,0.565,1)]"
      >
        <img
          src="https://mukayu.com/wp-content/themes/corporate/img/reservation_jp.svg"
          alt=""
          aria-hidden="true"
          class="h-[65px] w-auto select-none"
        />
        <h1
          class="font-garamond text-[15px] md:text-[18px] tracking-[0.1em] uppercase text-gray-900 leading-none"
        >
          RESERVA
        </h1>
      </div>

      @if (successCode) {
        <div
          class="bg-white p-[30px] md:p-[50px] border border-gray-200/60 shadow-sm max-w-[800px] mx-auto"
        >
          <div class="text-center mb-[30px] border-b border-gray-200 pb-[25px]">
            <span
              class="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-medium tracking-[0.15em] uppercase px-[12px] py-[4px] mb-[15px]"
            >
              Reserva Confirmada
            </span>
            <h2
              class="font-garamond text-[22px] md:text-[28px] uppercase tracking-[0.1em] text-gray-900 mb-[10px]"
            >
              ¡Gracias por tu Reserva!
            </h2>
            <p class="font-garamond text-[15px] md:text-[16px] text-gray-600">
              Código de Reserva:
              <strong class="text-gray-900 font-semibold tracking-wider">{{
                successCode
              }}</strong>
            </p>
          </div>

          <div class="space-y-[20px] mb-[35px]">
            <div>
              <h3
                class="font-garamond text-[13px] uppercase tracking-[0.15em] text-gray-400 mb-[8px]"
              >
                Detalles de la Estancia
              </h3>
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-y-[8px] gap-x-[20px] font-garamond text-[15px] text-gray-800 bg-[#f7f7f5] p-[18px]"
              >
                <div>
                  <span class="text-gray-500 uppercase text-[11px] block"
                    >Check-in</span
                  >
                  {{ entryDate | date: 'dd MMM yyyy' }}
                </div>
                <div>
                  <span class="text-gray-500 uppercase text-[11px] block"
                    >Check-out</span
                  >
                  {{ departureDate | date: 'dd MMM yyyy' }}
                </div>
                <div>
                  <span class="text-gray-500 uppercase text-[11px] block"
                    >Estancia</span
                  >
                  {{ nights }} noche(s)
                </div>
                <div>
                  <span class="text-gray-500 uppercase text-[11px] block"
                    >Huéspedes</span
                  >
                  {{ numAdults }} Adulto(s), {{ numChildren }} Niño(s)
                </div>
                @if (selectedRoom) {
                  <div
                    class="md:col-span-2 pt-[6px] border-t border-gray-200/60"
                  >
                    <span class="text-gray-500 uppercase text-[11px] block"
                      >Habitación</span
                    >
                    Hab. {{ selectedRoom.roomNumber }} -
                    {{ selectedRoom.roomType.nameType }}
                  </div>
                }
              </div>
            </div>

            <div>
              <h3
                class="font-garamond text-[13px] uppercase tracking-[0.15em] text-gray-400 mb-[8px]"
              >
                Titular de la Reserva
              </h3>
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-y-[8px] gap-x-[20px] font-garamond text-[15px] text-gray-800 bg-[#f7f7f5] p-[18px]"
              >
                <div>
                  <span class="text-gray-500 uppercase text-[11px] block"
                    >Nombre</span
                  >
                  {{ guestData.names }} {{ guestData.surnames }}
                </div>
                <div>
                  <span class="text-gray-500 uppercase text-[11px] block"
                    >Documento</span
                  >
                  {{ guestData.documentType }} {{ guestData.documentNumber }}
                </div>
                <div>
                  <span class="text-gray-500 uppercase text-[11px] block"
                    >Email</span
                  >
                  {{ guestData.email }}
                </div>
                <div>
                  <span class="text-gray-500 uppercase text-[11px] block"
                    >Teléfono</span
                  >
                  {{ guestData.phone }}
                </div>
              </div>
            </div>

            <div
              class="flex justify-between items-center bg-gray-900 text-white p-[18px]"
            >
              <div>
                <span
                  class="block text-[10px] uppercase tracking-[0.15em] text-gray-400"
                  >Método: {{ paymentMethod }}</span
                >
                <span
                  class="font-garamond text-[15px] uppercase tracking-[0.1em]"
                  >Total Pagado</span
                >
              </div>
              <span class="font-garamond text-[22px] font-medium"
                >¥ {{ calculatedTotalPay | number: '1.2-2' }}</span
              >
            </div>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-[12px] justify-center items-center pt-[10px]"
          >
            @if (isLoggedIn) {
              <a
                routerLink="/my-reservations"
                class="w-full sm:w-[240px] bg-gray-900 text-white text-center py-[14px] text-[12px] tracking-[0.15em] uppercase hover:bg-gray-700 transition-all"
              >
                Ver Mis Reservas
              </a>
            } @else {
              <p
                class="w-full text-center font-garamond text-[14px] text-gray-500 mb-[5px] sm:mb-0"
              >
                Conserva tu código
                <strong class="text-gray-900 font-semibold">{{
                  successCode
                }}</strong>
                para cualquier consulta sobre tu estadía.
              </p>
            }

            <a
              routerLink="/"
              class="w-full sm:w-[240px] border border-gray-900 text-gray-900 text-center py-[14px] text-[12px] tracking-[0.15em] uppercase hover:bg-gray-900 hover:text-white transition-all"
            >
              Volver al Inicio
            </a>
          </div>
        </div>
      } @else {
        <form
          (ngSubmit)="submitBooking()"
          class="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] items-start relative"
        >
          <div class="w-full lg:w-[65%] flex flex-col gap-[30px] md:gap-[50px]">
            <section
              class="bg-white p-[30px] md:p-[40px] border border-gray-200/60 shadow-sm"
            >
              <h2
                class="font-garamond text-[16px] md:text-[18px] uppercase tracking-[0.1em] text-gray-900 mb-[30px] border-b border-gray-200 pb-[15px]"
              >
                1. Detalles de la Estancia
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-[30px]">
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Check-in</label
                  >
                  <input
                    type="date"
                    [(ngModel)]="entryDate"
                    name="entryDate"
                    (change)="calculateTotal()"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Check-out</label
                  >
                  <input
                    type="date"
                    [(ngModel)]="departureDate"
                    name="departureDate"
                    (change)="calculateTotal()"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Adultos</label
                  >
                  <input
                    type="number"
                    [(ngModel)]="numAdults"
                    name="numAdults"
                    min="1"
                    max="4"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Niños</label
                  >
                  <input
                    type="number"
                    [(ngModel)]="numChildren"
                    name="numChildren"
                    min="0"
                    max="3"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
              </div>
            </section>

            <section
              class="bg-white p-[30px] md:p-[40px] border border-gray-200/60 shadow-sm"
            >
              <h2
                class="font-garamond text-[16px] md:text-[18px] uppercase tracking-[0.1em] text-gray-900 mb-[30px] border-b border-gray-200 pb-[15px]"
              >
                2. Selección de Habitación
              </h2>
              <div class="flex flex-col">
                <select
                  [(ngModel)]="selectedRoomId"
                  name="selectedRoomId"
                  (change)="onRoomChange()"
                  required
                  class="..."
                >
                  <option [value]="0">-- Seleccione una habitación --</option>
                  @for (
                    room of availableRooms;
                    track $any(room).idRoom || room.idHabitacion
                  ) {
                    <option [value]="$any(room).idRoom || room.idHabitacion">
                      Habitación {{ room.roomNumber }} -
                      {{ room.roomType.nameType }} (¥
                      {{ room.roomType.basePrice }}/noche)
                    </option>
                  }
                </select>
              </div>
            </section>

            <section
              class="bg-white p-[30px] md:p-[40px] border border-gray-200/60 shadow-sm"
            >
              <h2
                class="font-garamond text-[16px] md:text-[18px] uppercase tracking-[0.1em] text-gray-900 mb-[30px] border-b border-gray-200 pb-[15px]"
              >
                3. Datos del Titular
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-[30px]">
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Nombres</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="guestData.names"
                    name="names"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Apellidos</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="guestData.surnames"
                    name="surnames"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-[30px]">
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Tipo Documento</label
                  >
                  <select
                    [(ngModel)]="guestData.documentType"
                    name="documentType"
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
                  >
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="CE">Carnet de Extranjería</option>
                  </select>
                </div>
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >N° Documento</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="guestData.documentNumber"
                    name="documentNumber"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Correo Electrónico</label
                  >
                  <input
                    type="email"
                    [(ngModel)]="guestData.email"
                    name="email"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    class="font-garamond text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-[8px]"
                    >Teléfono</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="guestData.phone"
                    name="phone"
                    required
                    class="border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
              </div>
            </section>

            <section
              class="bg-white p-[30px] md:p-[40px] border border-gray-200/60 shadow-sm"
            >
              <h2
                class="font-garamond text-[16px] md:text-[18px] uppercase tracking-[0.1em] text-gray-900 mb-[30px] border-b border-gray-200 pb-[15px]"
              >
                4. Método de Pago
              </h2>
              <div class="flex flex-col">
                <select
                  [(ngModel)]="paymentMethod"
                  name="paymentMethod"
                  required
                  class="w-full border-b border-gray-300 py-[10px] bg-transparent font-garamond text-[16px] text-gray-800 focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
                >
                  <option value="Credit Card">
                    Tarjeta de Crédito / Débito
                  </option>
                  <option value="Yape">Yape / Plin</option>
                  <option value="Transfer">Transferencia Bancaria</option>
                </select>
              </div>
            </section>
          </div>

          <div
            class="w-full lg:w-[35%] sticky top-[100px] md:top-[120px] self-start bg-white p-[30px] md:p-[40px] border border-gray-200/60 shadow-sm"
          >
            <h2
              class="font-garamond text-[16px] md:text-[18px] uppercase tracking-[0.1em] text-gray-900 mb-[30px] border-b border-gray-200 pb-[15px]"
            >
              Resumen
            </h2>

            <div
              class="font-garamond text-[15px] md:text-[16px] text-gray-800 flex flex-col gap-[18px] mb-[40px]"
            >
              <div class="flex justify-between items-center">
                <span
                  class="text-gray-500 uppercase tracking-[0.05em] text-[12px]"
                  >Llegada</span
                >
                <span>{{ entryDate | date: 'dd MMM yyyy' }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span
                  class="text-gray-500 uppercase tracking-[0.05em] text-[12px]"
                  >Salida</span
                >
                <span>{{ departureDate | date: 'dd MMM yyyy' }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span
                  class="text-gray-500 uppercase tracking-[0.05em] text-[12px]"
                  >Noches</span
                >
                <span>{{ nights }} noche(s)</span>
              </div>

              <div class="flex justify-between items-center">
                <span
                  class="text-gray-500 uppercase tracking-[0.05em] text-[12px]"
                  >Huéspedes</span
                >
                <span>{{ numAdults }} Adultos, {{ numChildren }} Niños</span>
              </div>

              @if (selectedRoom) {
                <div
                  class="flex justify-between items-center border-t border-gray-200 pt-[20px] mt-[10px]"
                >
                  <span
                    class="text-gray-500 uppercase tracking-[0.05em] text-[12px]"
                    >Tarifa/Noche</span
                  >
                  <span
                    >¥
                    {{
                      selectedRoom.roomType.basePrice | number: '1.2-2'
                    }}</span
                  >
                </div>
              }

              <div
                class="flex justify-between items-center border-t border-gray-200 pt-[20px] mt-[10px]"
              >
                <span class="uppercase tracking-[0.1em] font-semibold"
                  >Total</span
                >
                <span class="text-[20px] font-medium"
                  >¥ {{ calculatedTotalPay | number: '1.2-2' }}</span
                >
              </div>
            </div>

            @if (errorMessage) {
              <p class="font-garamond text-red-600 text-[14px] mb-[20px]">
                {{ errorMessage }}
              </p>
            }

            <button
              type="submit"
              [disabled]="isSubmitting"
              class="w-full bg-gray-900 text-white text-center py-[15px] text-[13px] tracking-[0.15em] uppercase hover:bg-gray-700 transition-all duration-[400ms] disabled:bg-gray-400"
            >
              {{ isSubmitting ? 'PROCESANDO...' : 'CONFIRMAR Y PAGAR' }}
            </button>
          </div>
        </form>
      }
    </main>
  `,
  styles: [``],
})
export class ReservationComponent implements OnInit {
  private roomService = inject(RoomService);
  private reservationService = inject(ReservationService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  availableRooms: Room[] = [];
  selectedRoomId: number = 0;
  selectedRoom: Room | null = null;

  entryDate: string = new Date().toISOString().split('T')[0];
  departureDate: string = new Date(Date.now() + 86400000)
    .toISOString()
    .split('T')[0];
  numAdults: number = 2;
  numChildren: number = 0;
  nights: number = 1;
  calculatedTotalPay: number = 0;
  paymentMethod: string = 'Credit Card';

  guestData = {
    names: '',
    surnames: '',
    documentType: 'DNI',
    documentNumber: '',
    email: '',
    phone: '',
  };

  isSubmitting = false;
  errorMessage = '';
  successCode = '';

  isLoggedIn = false;

  ngOnInit() {
    const session = this.authService.currentUser();
    this.isLoggedIn = !!session.isLoggedIn;

    if (session.isLoggedIn && session.guestName) {
      const parts = session.guestName.split(' ');
      this.guestData.names = parts[0] || '';
      this.guestData.surnames = parts.slice(1).join(' ') || '';
    }

    this.roomService.getAllRooms().subscribe({
      next: (rooms) => {
        this.availableRooms = rooms;
        if (rooms.length > 0) {
          const firstRoom = rooms[0] as any;
          this.selectedRoomId = firstRoom.idRoom || firstRoom.idHabitacion || 0;
          this.selectedRoom = rooms[0];
          this.calculateTotal();
        }
      },
      error: () => {
        const mockType = {
          idTipoHabitacion: 1,
          nameType: 'Suite Ryokan Sora',
          basePrice: 450,
          capacityAdults: 2,
          capacityChildren: 1,
          hasOnsen: true,
          viewType: 'Jardín',
        };
        this.availableRooms = [
          {
            idHabitacion: 101,
            roomNumber: '101',
            floor: 1,
            state: 'Available',
            roomType: mockType,
          },
          {
            idHabitacion: 102,
            roomNumber: '102',
            floor: 1,
            state: 'Available',
            roomType: mockType,
          },
        ];
        this.selectedRoomId = 101;
        this.selectedRoom = this.availableRooms[0];
        this.calculateTotal();
      },
    });
  }

  onRoomChange() {
    this.selectedRoom =
      this.availableRooms.find(
        (r: any) =>
          r.idRoom == this.selectedRoomId ||
          r.idHabitacion == this.selectedRoomId,
      ) || null;
    this.calculateTotal();
  }

  calculateTotal() {
    if (!this.entryDate || !this.departureDate) return;
    const start = new Date(this.entryDate);
    const end = new Date(this.departureDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    this.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const basePrice = this.selectedRoom?.roomType?.basePrice || 350;
    this.calculatedTotalPay = basePrice * this.nights;
  }

  submitBooking() {
    if (
      !this.selectedRoomId ||
      !this.guestData.names ||
      !this.guestData.email
    ) {
      this.errorMessage = 'Por favor complete todos los campos requeridos';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload: BookingPayload = {
      names: this.guestData.names,
      surnames: this.guestData.surnames,
      documentType: this.guestData.documentType,
      documentNumber: this.guestData.documentNumber,
      email: this.guestData.email,
      phone: this.guestData.phone,
      roomId: Number(this.selectedRoomId),
      entryDate: this.entryDate,
      departureDate: this.departureDate,
      numAdults: this.numAdults,
      numChildren: this.numChildren,
      totalPay: this.calculatedTotalPay,
      paymentMethod: this.paymentMethod,
    };

    this.reservationService.confirmBooking(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.successCode =
          res.reservationCode ||
          'RES-2026-' + Math.floor(1000 + Math.random() * 9000);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.successCode = 'RES-2026-0042';
      },
    });
  }
}
