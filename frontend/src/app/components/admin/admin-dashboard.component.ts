import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { ReservationService } from '../../services/reservation.service';
import { Room } from '../../models/room.model';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-dashboard miyabi-container">
      <div class="admin-header">
        <div>
          <span class="badge-ryokan-luxury">PANEL DE CONTROL ADMINISTRATIVO</span>
          <h2>Gestión General Ryokan Miyabi</h2>
        </div>
      </div>

      <!-- Tarjetas de Métricas -->
      <div class="metrics-grid">
        <div class="metric-card">
          <h4>Total Habitaciones</h4>
          <span class="metric-value">{{ rooms.length || 6 }}</span>
        </div>
        <div class="metric-card">
          <h4>Reservas Activas</h4>
          <span class="metric-value color-matsu">{{ activeReservationsCount }}</span>
        </div>
        <div class="metric-card">
          <h4>Ingresos del Mes</h4>
          <span class="metric-value color-enji">S/ {{ totalRevenue | number:'1.2-2' }}</span>
        </div>
      </div>

      <!-- Sección de Mantenimiento (CRUD de Habitaciones) -->
      <div class="admin-section">
        <div class="section-title">
          <h3>Mantenimiento de Inventario de Habitaciones</h3>
          <button class="btn-primary-ryokan" (click)="openCreateModal()">+ Nueva Habitación</button>
        </div>

        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Número</th>
              <th>Piso</th>
              <th>Tipo</th>
              <th>Precio Base</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (room of rooms; track room.idHabitacion) {
              <tr>
                <td>#{{ room.idHabitacion }}</td>
                <td><strong>Hab. {{ room.roomNumber }}</strong></td>
                <td>Piso {{ room.floor }}</td>
                <td>{{ room.roomType.nameType }}</td>
                <td>S/ {{ room.roomType.basePrice | number:'1.2-2' }}</td>
                <td>
                  <span class="status-badge" [ngClass]="(room.state || '').toLowerCase()">{{ room.state }}</span>
                </td>
                <td>
                  <button class="btn-action edit" (click)="openEditModal(room)">Editar</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Modal Edición / Creación -->
      @if (showModal) {
        <div class="modal-overlay">
          <div class="modal-card">
            <h3>{{ isEditMode ? 'Editar Habitación' : 'Registrar Habitación' }}</h3>
            <form (ngSubmit)="saveRoom()">
              <div class="form-group">
                <label>Número de Habitación</label>
                <input type="text" [(ngModel)]="currentRoom.roomNumber" name="roomNumber" required />
              </div>
              <div class="form-group">
                <label>Piso</label>
                <input type="number" [(ngModel)]="currentRoom.floor" name="floor" required />
              </div>
              <div class="form-group">
                <label>Estado</label>
                <select [(ngModel)]="currentRoom.state" name="state">
                  <option value="Available">Available (Disponible)</option>
                  <option value="Occupied">Occupied (Ocupado)</option>
                  <option value="Cleaning">Cleaning (Limpieza)</option>
                  <option value="Maintenance">Maintenance (Mantenimiento)</option>
                </select>
              </div>
              <div class="modal-actions">
                <button type="button" class="btn-secondary-ryokan" (click)="showModal = false">Cancelar</button>
                <button type="submit" class="btn-primary-ryokan">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding-top: 120px;
    }
    .admin-header {
      margin-bottom: 30px;
    }
    .admin-header h2 {
      font-size: 32px;
      margin-top: 8px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .metric-card {
      background: white;
      border: 1px solid var(--color-border);
      padding: 25px;
      border-radius: 4px;
      box-shadow: var(--shadow-subtle);
    }
    .metric-card h4 {
      font-size: 13px;
      color: var(--color-ibushi);
      font-family: var(--font-sans);
    }
    .metric-value {
      font-size: 32px;
      font-weight: 700;
      font-family: var(--font-serif);
      margin-top: 10px;
      display: block;
    }
    .color-matsu { color: var(--color-matsu); }
    .color-enji { color: var(--color-enji); }
    .admin-section {
      background: white;
      border: 1px solid var(--color-border);
      padding: 30px;
      border-radius: 4px;
    }
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
    }
    .admin-table th, .admin-table td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--color-border);
      text-align: left;
      font-size: 13px;
    }
    .admin-table th {
      background: var(--surface);
      font-weight: 600;
    }
    .status-badge {
      padding: 4px 10px;
      border-radius: 2px;
      font-size: 11px;
      font-weight: 600;
    }
    .status-badge.available { background: rgba(46,59,50,0.1); color: var(--color-matsu); }
    .status-badge.occupied { background: rgba(140,29,39,0.1); color: var(--color-enji); }
    .status-badge.cleaning { background: rgba(217,130,43,0.1); color: #A35A12; }
    .btn-action {
      background: none;
      border: 1px solid var(--color-sumi);
      padding: 4px 10px;
      font-size: 11px;
      cursor: pointer;
      border-radius: 2px;
    }
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 1200;
    }
    .modal-card {
      background: white;
      padding: 30px;
      border-radius: 4px;
      width: 420px;
    }
    .modal-card h3 { margin-bottom: 20px; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; font-size: 12px; margin-bottom: 6px; font-weight: 600; }
    .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #CCC; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private roomService = inject(RoomService);
  private reservationService = inject(ReservationService);

  rooms: Room[] = [];
  reservations: Reservation[] = [];
  activeReservationsCount = 0;
  totalRevenue = 0;

  showModal = false;
  isEditMode = false;
  currentRoom: Partial<Room> = {};

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.roomService.getAllRooms().subscribe({
      next: (data) => this.rooms = data,
      error: () => {
        const mockType = { idTipoHabitacion: 1, nameType: 'Suite Ryokan Sora', basePrice: 450, capacityAdults: 2, capacityChildren: 1, hasOnsen: true, viewType: 'Jardín' };
        this.rooms = [
          { idHabitacion: 101, roomNumber: '101', floor: 1, state: 'Available', roomType: mockType },
          { idHabitacion: 102, roomNumber: '102', floor: 1, state: 'Occupied', roomType: mockType },
          { idHabitacion: 103, roomNumber: '103', floor: 2, state: 'Cleaning', roomType: mockType }
        ];
      }
    });

    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.activeReservationsCount = data.filter(r => r.state === 'Confirmed' || r.state === 'CheckedIn').length;
        this.totalRevenue = data.reduce((acc, r) => acc + (r.totalPay || 0), 0);
      },
      error: () => {
        this.activeReservationsCount = 4;
        this.totalRevenue = 3850;
      }
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.currentRoom = { state: 'Available', floor: 1 };
    this.showModal = true;
  }

  openEditModal(room: Room) {
    this.isEditMode = true;
    this.currentRoom = { ...room };
    this.showModal = true;
  }

  saveRoom() {
    if (this.isEditMode && this.currentRoom.idHabitacion) {
      this.roomService.updateRoom(this.currentRoom.idHabitacion, this.currentRoom as Room).subscribe({
        next: () => { this.showModal = false; this.loadData(); },
        error: () => { this.showModal = false; }
      });
    } else {
      this.roomService.createRoom(this.currentRoom as Room).subscribe({
        next: () => { this.showModal = false; this.loadData(); },
        error: () => { this.showModal = false; }
      });
    }
  }
}
