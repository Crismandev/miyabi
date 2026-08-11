import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReservationAdminService, AdminReservation } from '../../services/reservation-admin.service';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <main class="admin-container">
      <div class="content-wrapper">
        <!-- Header -->
        <div class="page-header">
          <div>
            <span class="section-tag">PANEL OPERATIVO DE RECEPCIÓN</span>
            <h1 class="page-title">Gestión de Reservas Ryokan</h1>
            <p class="page-subtitle">Control integral de reservas, solicitudes de huéspedes y estados de check-in / check-out en tiempo real.</p>
          </div>
          <button class="btn-miyabi btn-miyabi-enji" (click)="openCreateModal()">
            + Nueva Reserva Manual
          </button>
        </div>

        <!-- Tarjetas KPI de Estado -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">TOTAL RESERVAS</div>
            <div class="kpi-value">{{ reservations.length }}</div>
            <span class="kpi-sub font-mono">Registradas en sistema</span>
          </div>
          <div class="kpi-card warning">
            <div class="kpi-label">POR CONFIRMAR</div>
            <div class="kpi-value text-gold">{{ pendingCount }}</div>
            <span class="kpi-sub">Atención requerida</span>
          </div>
          <div class="kpi-card success">
            <div class="kpi-label">CONFIRMADAS</div>
            <div class="kpi-value text-success">{{ confirmedCount }}</div>
            <span class="kpi-sub">Reserva garantizada</span>
          </div>
          <div class="kpi-card info">
            <div class="kpi-label">EN CHECK-IN</div>
            <div class="kpi-value text-info">{{ checkinCount }}</div>
            <span class="kpi-sub">Huéspedes hospedados</span>
          </div>
        </div>

        <!-- Barra de Búsqueda y Filtros -->
        <div class="filter-card">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar por código (RES-...), nombre de huésped o habitación..." 
              [(ngModel)]="searchQuery"
              (input)="filterReservations()"
            />
          </div>
          <div class="status-filter">
            <label>Filtrar por Estado:</label>
            <select [(ngModel)]="statusFilter" (change)="filterReservations()">
              <option value="ALL">Todos los Estados</option>
              <option value="Pending">Pending (Pendiente)</option>
              <option value="Confirmed">Confirmed (Confirmada)</option>
              <option value="Check-in">Check-in (Hospedado)</option>
              <option value="Check-out">Check-out (Finalizado)</option>
              <option value="Cancelled">Cancelled (Cancelada)</option>
            </select>
          </div>
        </div>

        <!-- Tabla Principal de Reservas -->
        <div class="table-card">
          <div class="table-header">
            <h3>Listado de Reservas Registradas</h3>
            <span class="badge-count">{{ filteredReservations.length }} Resultados</span>
          </div>
          <div class="table-responsive">
            <table class="miyabi-table">
              <thead>
                <tr>
                  <th>CÓDIGO</th>
                  <th>HUÉSPED</th>
                  <th>HABITACIÓN</th>
                  <th>FECHAS ESTADÍA</th>
                  <th>TOTAL</th>
                  <th>ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                @for (res of filteredReservations; track getResId(res)) {
                  <tr>
                    <td class="font-mono font-bold text-enji">
                      {{ res.reservationCode || 'RES-0000' }}
                    </td>
                    <td>
                      <div class="guest-info">
                        <strong>{{ res.guest?.names }} {{ res.guest?.surnames }}</strong>
                        <small class="text-muted">{{ res.guest?.email || 'Sin correo' }}</small>
                      </div>
                    </td>
                    <td>
                      <span class="room-pill">
                        Hab. {{ res.room?.roomNumber || 'P3' }}
                      </span>
                    </td>
                    <td>
                      <div class="dates-info">
                        <span>{{ res.entryDate }} ➔ {{ res.departureDate }}</span>
                        <small class="text-muted">({{ res.numberNights || 1 }} noche/s)</small>
                      </div>
                    </td>
                    <td class="font-mono font-bold text-gold">
                      S/ {{ (res.totalPay || 0) | number:'1.2-2' }}
                    </td>
                    <td>
                      <span class="status-badge" [ngClass]="getStatusClass(res.state)">
                        ● {{ res.state || 'Pending' }}
                      </span>
                    </td>
                    <td>
                      <div class="action-buttons">
                        <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm" (click)="openStatusModal(res)">
                          ✏️ Cambiar Estado
                        </button>
                        <button class="btn-miyabi btn-miyabi-sm text-danger" (click)="cancelReservation(res)">
                          🗑️ Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="text-center py-5 text-muted">
                      No se encontraron reservas que coincidan con la búsqueda.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Editar Estado -->
    @if (showStatusModal && selectedReservation) {
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Modificar Estado de Reserva {{ selectedReservation.reservationCode }}</h3>
            <button class="close-btn" (click)="showStatusModal = false">✕</button>
          </div>
          <form (ngSubmit)="saveStatusChange()">
            <div class="form-group">
              <label>Nuevo Estado Operativo</label>
              <select [(ngModel)]="newStatus" name="newStatus" required>
                <option value="Pending">Pending (Pendiente por confirmar)</option>
                <option value="Confirmed">Confirmed (Reserva Confirmada)</option>
                <option value="Check-in">Check-in (Huésped Hospedado)</option>
                <option value="Check-out">Check-out (Estadía Finalizada)</option>
                <option value="Cancelled">Cancelled (Cancelada)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Observaciones de Recepción</label>
              <textarea [(ngModel)]="statusObservations" name="statusObservations" rows="3" placeholder="Añadir notas sobre el pago, equipaje, requerimientos especiales..."></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-miyabi btn-miyabi-outline" (click)="showStatusModal = false">Cancelar</button>
              <button type="submit" class="btn-miyabi btn-miyabi-enji">Actualizar Estado</button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Modal Crear Reserva Manual -->
    @if (showCreateModal) {
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Registrar Reserva Manual (Recepción)</h3>
            <button class="close-btn" (click)="showCreateModal = false">✕</button>
          </div>
          <form (ngSubmit)="saveNewReservation()">
            <div class="form-group">
              <label>Seleccionar Habitación</label>
              <select [(ngModel)]="newResRoomId" name="newResRoomId" required>
                @for (rm of rooms; track rm.idRoom || rm.idHabitacion) {
                  <option [value]="rm.idRoom || rm.idHabitacion">Hab. {{ rm.roomNumber }} - {{ rm.roomType?.nameType || 'Suite' }}</option>
                }
              </select>
            </div>
            <div class="form-group">
              <label>Fecha de Entrada (Check-in)</label>
              <input type="date" [(ngModel)]="newResEntryDate" name="newResEntryDate" required />
            </div>
            <div class="form-group">
              <label>Fecha de Salida (Check-out)</label>
              <input type="date" [(ngModel)]="newResDepartureDate" name="newResDepartureDate" required />
            </div>
            <div class="form-group">
              <label>Número de Adultos</label>
              <input type="number" [(ngModel)]="newResAdults" name="newResAdults" min="1" max="6" required />
            </div>
            <div class="form-group">
              <label>Observaciones</label>
              <input type="text" [(ngModel)]="newResObs" name="newResObs" placeholder="Reserva presencial o telefónica" />
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-miyabi btn-miyabi-outline" (click)="showCreateModal = false">Cancelar</button>
              <button type="submit" class="btn-miyabi btn-miyabi-enji">Crear Reserva</button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .admin-container { padding: 40px 20px; background-color: #FBF9F5; min-height: 90vh; }
    .content-wrapper { max-width: 1200px; margin: 0 auto; }
    .section-tag { font-size: 11px; letter-spacing: 2px; color: var(--color-kinjiki); font-weight: 700; text-transform: uppercase; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
    .page-title { font-family: var(--font-serif); font-size: 32px; color: var(--color-sumi); margin: 5px 0; }
    .page-subtitle { color: #666; font-size: 14px; margin: 0; }

    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
    .kpi-card { background: white; padding: 20px; border-radius: 8px; border: 1px solid #EAE3D2; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
    .kpi-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #888; }
    .kpi-value { font-size: 28px; font-weight: 700; font-family: var(--font-mono); margin: 8px 0; color: var(--color-enji); }
    .kpi-sub { font-size: 12px; color: #777; }

    .filter-card { background: white; padding: 20px; border-radius: 8px; border: 1px solid #EAE3D2; display: flex; gap: 20px; align-items: center; margin-bottom: 25px; }
    .search-box { flex: 1; display: flex; align-items: center; background: #F5F2EB; padding: 8px 15px; border-radius: 6px; }
    .search-box input { border: none; background: transparent; width: 100%; margin-left: 10px; font-size: 14px; outline: none; }
    .status-filter { display: flex; align-items: center; gap: 10px; }
    .status-filter select { padding: 8px 12px; border: 1px solid #CCC; border-radius: 6px; background: white; }

    .table-card { background: white; border-radius: 8px; border: 1px solid #EAE3D2; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
    .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .badge-count { background: var(--color-kinjiki); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }

    .miyabi-table { width: 100%; border-collapse: collapse; text-align: left; }
    .miyabi-table th { padding: 12px; border-bottom: 2px solid #EAE3D2; font-size: 11px; letter-spacing: 1px; color: #777; }
    .miyabi-table td { padding: 14px 12px; border-bottom: 1px solid #F0EADF; font-size: 14px; }
    .room-pill { background: #F5F2EB; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-family: var(--font-mono); }
    
    .status-badge { font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 20px; }
    .status-pending { background: #FFF3CD; color: #856404; }
    .status-confirmed { background: #D4EDDA; color: #155724; }
    .status-checkin { background: #CCE5FF; color: #004085; }
    .status-checkout { background: #E2E3E5; color: #383D41; }
    .status-cancelled { background: #F8D7DA; color: #721C24; }

    .action-buttons { display: flex; gap: 8px; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
    .modal-card { background: white; padding: 30px; border-radius: 8px; width: 480px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; font-size: 12px; font-weight: 700; margin-bottom: 6px; }
    .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #CCC; border-radius: 4px; font-family: inherit; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  `]
})
export class AdminReservationsComponent implements OnInit {
  private resService = inject(ReservationAdminService);
  private roomService = inject(RoomService);

  reservations: AdminReservation[] = [];
  filteredReservations: AdminReservation[] = [];
  rooms: Room[] = [];

  searchQuery = '';
  statusFilter = 'ALL';

  pendingCount = 0;
  confirmedCount = 0;
  checkinCount = 0;

  showStatusModal = false;
  selectedReservation: AdminReservation | null = null;
  newStatus = 'Confirmed';
  statusObservations = '';

  showCreateModal = false;
  newResRoomId = 1;
  newResEntryDate = new Date().toISOString().substring(0, 10);
  newResDepartureDate = new Date(Date.now() + 86400000 * 2).toISOString().substring(0, 10);
  newResAdults = 2;
  newResObs = 'Reserva manual de recepción';

  ngOnInit() {
    this.loadData();
    this.loadRooms();
  }

  getResId(res: AdminReservation): number {
    return res.reservationId || res.idReserva || 0;
  }

  loadData() {
    this.resService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.calculateMetrics();
        this.filterReservations();
      },
      error: () => {
        this.reservations = [];
        this.filterReservations();
      }
    });
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (data) => this.rooms = data,
      error: () => this.rooms = []
    });
  }

  calculateMetrics() {
    this.pendingCount = this.reservations.filter(r => (r.state || '').toLowerCase() === 'pending').length;
    this.confirmedCount = this.reservations.filter(r => (r.state || '').toLowerCase() === 'confirmed').length;
    this.checkinCount = this.reservations.filter(r => (r.state || '').toLowerCase() === 'check-in').length;
  }

  filterReservations() {
    const q = this.searchQuery.toLowerCase();
    this.filteredReservations = this.reservations.filter(r => {
      const matchQuery = !q ||
        (r.reservationCode || '').toLowerCase().includes(q) ||
        ((r.guest?.names || '') + ' ' + (r.guest?.surnames || '')).toLowerCase().includes(q) ||
        (r.room?.roomNumber || '').toLowerCase().includes(q);

      const matchStatus = this.statusFilter === 'ALL' || (r.state || '').toLowerCase() === this.statusFilter.toLowerCase();

      return matchQuery && matchStatus;
    });
  }

  getStatusClass(state?: string): string {
    switch ((state || '').toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'check-in': return 'status-checkin';
      case 'check-out': return 'status-checkout';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  }

  openStatusModal(res: AdminReservation) {
    this.selectedReservation = res;
    this.newStatus = res.state || 'Confirmed';
    this.statusObservations = res.observations || '';
    this.showStatusModal = true;
  }

  saveStatusChange() {
    if (!this.selectedReservation) return;
    const id = this.getResId(this.selectedReservation);
    this.resService.updateReservation(id, { state: this.newStatus, observations: this.statusObservations }).subscribe({
      next: () => {
        this.showStatusModal = false;
        this.loadData();
      },
      error: (err) => {
        alert('Error al actualizar reserva: ' + (err.error?.message || err.message));
        this.showStatusModal = false;
        this.loadData();
      }
    });
  }

  cancelReservation(res: AdminReservation) {
    const id = this.getResId(res);
    if (!id) return;
    if (confirm(`¿Está seguro de cancelar la reserva ${res.reservationCode}?`)) {
      this.resService.updateReservation(id, { state: 'Cancelled' }).subscribe({
        next: () => this.loadData(),
        error: () => this.loadData()
      });
    }
  }

  openCreateModal() {
    this.newResRoomId = this.rooms.length > 0 ? (this.rooms[0].idRoom || this.rooms[0].idHabitacion || 1) : 1;
    this.showCreateModal = true;
  }

  saveNewReservation() {
    const newRes: Partial<AdminReservation> = {
      entryDate: this.newResEntryDate,
      departureDate: this.newResDepartureDate,
      numAdults: this.newResAdults,
      numChildren: 0,
      pricePerNight: 150000,
      observations: this.newResObs,
      state: 'Confirmed',
      room: { idRoom: Number(this.newResRoomId), roomNumber: '101', floor: 1, state: 'Available' } as Room
    };

    this.resService.createReservation(newRes).subscribe({
      next: () => {
        this.showCreateModal = false;
        this.loadData();
      },
      error: (err) => {
        alert('Error al crear reserva manual: ' + (err.error?.message || err.message || 'Complete datos válidos'));
        this.showCreateModal = false;
        this.loadData();
      }
    });
  }
}
