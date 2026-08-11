import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room, RoomType } from '../../models/room.model';

@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- Header Admin Back-Office -->
    <header class="miyabi-admin-navbar">
      <div class="d-flex align-items-center gap-4">
        <a routerLink="/admin/dashboard" class="miyabi-admin-brand">
          <span class="kanji-logo">雅</span>
          <span class="brand-title">MIYABI</span>
          <span class="brand-badge">Back-office</span>
        </a>

        <ul class="miyabi-admin-nav">
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/dashboard" class="nav-link-miyabi">
              <i class="bi bi-grid-1x2-fill"></i> Dashboard
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/rooms" class="nav-link-miyabi active">
              <i class="bi bi-door-open-fill"></i> Habitaciones
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/room-types" class="nav-link-miyabi">
              <i class="bi bi-tags-fill"></i> Tarifas & Suites
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/users" class="nav-link-miyabi">
              <i class="bi bi-people-fill"></i> Personal
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/movements" class="nav-link-miyabi">
              <i class="bi bi-clock-history"></i> Movimientos
            </a>
          </li>
        </ul>
      </div>

      <div class="admin-navbar-actions">
        <div class="admin-profile-pill">
          <span class="admin-avatar">A</span>
          <div class="admin-user-info">
            <span class="admin-name">Admin Ryokan</span>
            <span class="admin-role">Administrador</span>
          </div>
        </div>

        <a routerLink="/" class="btn-view-site">
          <i class="bi bi-box-arrow-up-right"></i> VER PORTAL WEB
        </a>
      </div>
    </header>

    <main class="miyabi-admin-container">
      <div class="miyabi-page-header">
        <div>
          <h1 class="miyabi-page-title">Inventario de Habitaciones</h1>
          <p class="miyabi-page-subtitle">Gestión centralizada de unidades, disponibilidad operativa y tarifas asignadas.</p>
        </div>
        <div>
          <button class="btn-miyabi btn-miyabi-enji" (click)="openCreateModal()">
            <i class="bi bi-plus-lg"></i> Nueva Habitación
          </button>
        </div>
      </div>

      <!-- Tabla Ryokan de Habitaciones -->
      <div class="miyabi-card-table">
        <div class="miyabi-card-header">
          <div class="d-flex align-items-center gap-3">
            <h2 class="miyabi-card-title">
              <i class="bi bi-door-open me-2" style="color: var(--color-enji);"></i>Catálogo de Habitaciones Ryokan
            </h2>
            <span class="miyabi-badge badge-active">{{ filteredRooms.length }} Registradas</span>
          </div>

          <div class="table-search-box">
            <i class="bi bi-search"></i>
            <input type="text" [(ngModel)]="searchQuery" (input)="filterRooms()" placeholder="Buscar por Nº o categoría..." />
          </div>
        </div>

        <div class="table-responsive">
          <table class="miyabi-table">
            <thead>
              <tr>
                <th>Nº Habitación</th>
                <th>Categoría & Tipo de Suite</th>
                <th>Estado Operativo</th>
                <th>Precio Base / Noche</th>
                <th class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (r of filteredRooms; track getRoomId(r)) {
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <span class="code-identifier fs-6">Hab. {{ r.roomNumber }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="fw-semibold text-dark">{{ r.roomType ? r.roomType.nameType : 'Suite Ryokan' }}</div>
                    <div class="text-muted small">{{ r.roomType?.description || 'Suite tradicional con vista al jardín' }}</div>
                  </td>
                  <td>
                    <span class="miyabi-badge" [ngClass]="getBadgeClass(r.state)">
                      {{ r.state }}
                    </span>
                  </td>
                  <td>
                    <span class="price-tabular">S/ {{ (r.roomType?.basePrice || 150) | number:'1.2-2' }}</span>
                  </td>
                  <td class="text-end">
                    <div class="btn-group">
                      <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm me-1" (click)="openEditModal(r)">
                        <i class="bi bi-pencil"></i> Editar
                      </button>
                      <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm text-danger" (click)="deleteRoom(getRoomId(r))">
                        <i class="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              }
              @if (filteredRooms.length === 0) {
                <tr>
                  <td colspan="5" class="text-center py-5 text-muted">
                    No hay habitaciones registradas.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal Formulario CRUD Habitación -->
    @if (showModal) {
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'Editar Habitación' : 'Registrar Habitación' }}</h3>
            <button class="close-btn" (click)="showModal = false">✕</button>
          </div>
          <form (ngSubmit)="saveRoom()">
            <div class="form-group">
              <label>Número de Habitación</label>
              <input type="text" [(ngModel)]="currentRoom.roomNumber" name="roomNumber" placeholder="Ej. 101, 202" required />
            </div>
            <div class="form-group">
              <label>Piso</label>
              <input type="number" [(ngModel)]="currentRoom.floor" name="floor" required />
            </div>
            <div class="form-group">
              <label>Estado Operativo</label>
              <select [(ngModel)]="currentRoom.state" name="state" required>
                <option value="Available">Available (Disponible)</option>
                <option value="Occupied">Occupied (Ocupada)</option>
                <option value="Maintenance">Maintenance (Mantenimiento)</option>
                <option value="Cleaning">Cleaning (Limpieza)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Categoría / Tipo de Habitación</label>
              <select [(ngModel)]="selectedTypeId" name="selectedTypeId" required>
                @for (type of roomTypes; track getTypeId(type)) {
                  <option [value]="getTypeId(type)">{{ type.nameType }} (S/ {{ type.basePrice }})</option>
                }
              </select>
            </div>
            <div class="form-group">
              <label>Descripción Adicional de la Habitación</label>
              <textarea [(ngModel)]="currentRoom.additionalDescription" name="additionalDescription" rows="3" placeholder="Notas sobre la unidad física, tina al aire libre, mantenimiento..." style="width: 100%; padding: 10px; border: 1px solid #CCC; border-radius: 4px; font-family: inherit;"></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-miyabi btn-miyabi-outline" (click)="showModal = false">Cancelar</button>
              <button type="submit" class="btn-miyabi btn-miyabi-enji">Guardar Habitación</button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
      z-index: 2000;
    }
    .modal-card {
      background: white; padding: 30px; border-radius: 8px; width: 450px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; font-size: 12px; font-weight: 700; margin-bottom: 6px; }
    .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #CCC; border-radius: 4px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  `]
})
export class AdminRoomsComponent implements OnInit {
  private roomService = inject(RoomService);

  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  roomTypes: RoomType[] = [];
  searchQuery = '';

  showModal = false;
  isEditMode = false;
  currentRoom: Partial<Room> = {};
  selectedTypeId: number = 1;

  ngOnInit() {
    this.loadData();
  }

  getRoomId(room: Room): number {
    return room.idRoom || room.idHabitacion || 0;
  }

  getTypeId(type: RoomType): number {
    return type.idTipo || type.idTipoHabitacion || 0;
  }

  loadData() {
    this.roomService.getAllRoomTypes().subscribe(types => {
      this.roomTypes = types;
      if (types.length > 0) this.selectedTypeId = this.getTypeId(types[0]) || 1;
    });

    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.filteredRooms = [...data];
      },
      error: () => {
        const mockType = { idTipo: 1, idTipoHabitacion: 1, nameType: 'Suite Ryokan Sora', basePrice: 450, capacityAdults: 2, capacityChildren: 1, hasOnsen: true, viewType: 'Jardín' };
        this.rooms = [
          { idRoom: 101, idHabitacion: 101, roomNumber: '101', floor: 1, state: 'Available', roomType: mockType },
          { idRoom: 102, idHabitacion: 102, roomNumber: '102', floor: 1, state: 'Occupied', roomType: mockType },
          { idRoom: 201, idHabitacion: 201, roomNumber: '201', floor: 2, state: 'Available', roomType: mockType }
        ];
        this.filteredRooms = [...this.rooms];
      }
    });
  }

  filterRooms() {
    const q = this.searchQuery.toLowerCase();
    this.filteredRooms = this.rooms.filter(r =>
      !q || r.roomNumber.toLowerCase().includes(q) || (r.roomType && r.roomType.nameType.toLowerCase().includes(q))
    );
  }

  getBadgeClass(state: string): string {
    switch (state?.toLowerCase()) {
      case 'available': return 'badge-confirmed';
      case 'occupied': return 'badge-cancelled';
      case 'maintenance': return 'badge-pending';
      default: return 'badge-active';
    }
  }

  openCreateModal() {
    this.isEditMode = false;
    this.currentRoom = { roomNumber: '', floor: 1, state: 'Available' };
    this.showModal = true;
  }

  openEditModal(room: Room) {
    this.isEditMode = true;
    this.currentRoom = { ...room };
    if (room.roomType) {
      this.selectedTypeId = this.getTypeId(room.roomType) || 1;
    }
    this.showModal = true;
  }

  saveRoom() {
    const selectedType = this.roomTypes.find(t => this.getTypeId(t) == this.selectedTypeId) || this.roomTypes[0];
    const roomId = this.getRoomId(this.currentRoom as Room);
    const roomToSave: Room = {
      idRoom: roomId || undefined,
      idHabitacion: roomId || undefined,
      roomNumber: this.currentRoom.roomNumber || '101',
      floor: this.currentRoom.floor || 1,
      state: (this.currentRoom.state as any) || 'Available',
      additionalDescription: this.currentRoom.additionalDescription || '',
      roomType: selectedType
    };

    if (this.isEditMode && roomId) {
      this.roomService.updateRoom(roomId, roomToSave).subscribe({
        next: () => { this.showModal = false; this.loadData(); },
        error: () => { this.showModal = false; this.loadData(); }
      });
    } else {
      this.roomService.createRoom(roomToSave).subscribe({
        next: () => { this.showModal = false; this.loadData(); },
        error: () => { this.showModal = false; this.loadData(); }
      });
    }
  }

  deleteRoom(id: number) {
    if (!id) return;
    if (confirm('¿Está seguro de eliminar esta habitación del catálogo y de la base de datos real?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (err) => {
          console.error('Error al eliminar habitación:', err);
          alert('Error al eliminar de la base de datos: ' + (err.error?.message || err.message || 'Error del servidor'));
          this.loadData();
        }
      });
    }
  }
}
