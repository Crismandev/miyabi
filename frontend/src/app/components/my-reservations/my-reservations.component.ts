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
    <div class="my-reservations-page miyabi-container">
      <div class="page-header">
        <span class="badge-ryokan-luxury">HISTORIAL DEL HUÉSPED</span>
        <h2>Mis Reservas & Comprobantes</h2>
      </div>

      @if (reservations.length === 0) {
        <div class="empty-state">
          <p>No tienes reservas registradas actualmente.</p>
          <a routerLink="/reservation" class="btn-primary-ryokan">HACER UNA RESERVA</a>
        </div>
      } @else {
        <div class="reservations-list">
          @for (res of reservations; track res.idReserva) {
            <div class="reservation-card">
              <div class="card-header">
                <div>
                  <span class="res-code">{{ res.reservationCode || 'RES-2026-00' + res.idReserva }}</span>
                  <span class="state-badge" [ngClass]="(res.state || '').toLowerCase()">{{ res.state }}</span>
                </div>
                <div class="total">Total: S/ {{ res.totalPay | number:'1.2-2' }}</div>
              </div>

              <div class="card-body">
                <p><strong>Check-in:</strong> {{ res.entryDate }}</p>
                <p><strong>Check-out:</strong> {{ res.departureDate }}</p>
                <p><strong>Huéspedes:</strong> {{ res.numAdults || 1 }} Adulto(s), {{ res.numChildren || 0 }} Niño(s)</p>
                <p *ngIf="res.room"><strong>Habitación:</strong> N° {{ res.room.roomNumber }} ({{ res.room.roomType.nameType }})</p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .my-reservations-page {
      padding-top: 120px;
    }
    .page-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .page-header h2 {
      font-size: 32px;
    }
    .empty-state {
      background: white;
      border: 1px solid var(--color-border);
      padding: 50px;
      text-align: center;
      border-radius: 4px;
    }
    .reservations-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    .reservation-card {
      background: white;
      border: 1px solid var(--color-border);
      padding: 25px;
      border-radius: 4px;
      box-shadow: var(--shadow-subtle);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--color-border);
    }
    .res-code {
      font-family: var(--font-serif);
      font-size: 20px;
      font-weight: 600;
      margin-right: 15px;
    }
    .state-badge {
      padding: 3px 10px;
      border-radius: 2px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      background: var(--badge-pending-bg);
      color: var(--badge-pending-color);
    }
    .state-badge.confirmed, .state-badge.checkedin {
      background: var(--badge-confirmed-bg);
      color: var(--badge-confirmed-color);
    }
    .state-badge.cancelled {
      background: var(--badge-cancelled-bg);
      color: var(--badge-cancelled-color);
    }
    .total {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-enji);
    }
  `]
})
export class MyReservationsComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private authService = inject(AuthService);
  reservations: Reservation[] = [];

  ngOnInit() {
    const session = this.authService.currentUser();
    const guestId = session.guestId || 1;

    this.reservationService.getReservationsByGuest(guestId).subscribe({
      next: (data) => this.reservations = data,
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
            state: 'Confirmed'
          }
        ];
      }
    });
  }
}
