import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { RoomType } from '../../models/room.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-room-types',
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
            <a routerLink="/admin/rooms" class="nav-link-miyabi">
              <i class="bi bi-door-open-fill"></i> Habitaciones
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/room-types" class="nav-link-miyabi active">
              <i class="bi bi-tags-fill"></i> Tarifas & Suites
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/users" class="nav-link-miyabi">
              <i class="bi bi-people-fill"></i> Personal
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
          <h1 class="miyabi-page-title">Tarifas y Suites Ryokan</h1>
          <p class="miyabi-page-subtitle">Configuración de suites de lujo, capacidades de hospedaje y precios por temporada.</p>
        </div>
        <div>
          <button class="btn-miyabi btn-miyabi-enji" (click)="openCreateModal()">
            <i class="bi bi-plus-lg"></i> Nuevo Tipo de Habitación
          </button>
        </div>
      </div>

      <!-- Catálogo Grid de Categorías & Tarifas -->
      <div class="types-grid">
        @for (t of roomTypes; track getTypeId(t)) {
          <div class="suite-card">
            <div class="suite-img-wrapper">
              <img [src]="t.primaryImage || 'https://be.synxis.com/shs-ngbe-image-resizer/images/hotel/23382/images/medium/room/japanese_premier_0002.jpg'" class="suite-img" alt="Suite" />
              <span class="capacity-badge">{{ t.capacityAdults }} Personas</span>
            </div>
            <div class="suite-content">
              <h3>{{ t.nameType }}</h3>
              <p class="desc">{{ t.description || 'Suite estilo japonés con vistas al jardín zen.' }}</p>
              
              <div class="price-box">
                <div class="price-row">
                  <span>Precio Base / Noche:</span>
                  <strong class="price-base">S/ {{ t.basePrice | number:'1.2-2' }}</strong>
                </div>
              </div>

              <div class="card-actions">
                <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm" (click)="openEditModal(t)">
                  <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm text-danger" (click)="deleteType(getTypeId(t))">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </main>

    <!-- Modal CRUD Tipo de Habitación -->
    @if (showModal) {
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'Editar Categoría de Suite' : 'Registrar Nuevo Tipo de Habitación' }}</h3>
            <button class="close-btn" (click)="showModal = false">✕</button>
          </div>
          <form (ngSubmit)="saveType()">
            <div class="form-group">
              <label>Nombre de la Categoría</label>
              <input type="text" [(ngModel)]="currentType.nameType" name="nameType" placeholder="Ej. Suite Ryokan Sora" required />
            </div>
            <div class="form-group">
              <label>Capacidad de Personas (Adultos)</label>
              <input type="number" [(ngModel)]="currentType.capacityAdults" name="capacityAdults" min="1" required />
            </div>
            <div class="form-group">
              <label>Precio Base / Noche (S/)</label>
              <input type="number" step="0.01" [(ngModel)]="currentType.basePrice" name="basePrice" required />
            </div>
            <div class="form-group">
              <label>URL de Imagen Principal</label>
              <input type="text" [(ngModel)]="currentType.primaryImage" name="primaryImage" placeholder="https://..." />
            </div>
            <div class="form-group">
              <label>Descripción de la Suite</label>
              <textarea [(ngModel)]="currentType.description" name="description" rows="3" placeholder="Detalles de distribución y amenidades..."></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-miyabi btn-miyabi-outline" (click)="showModal = false">Cancelar</button>
              <button type="submit" class="btn-miyabi btn-miyabi-enji">Guardar Tarifa</button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
    }
    .suite-card {
      background: white;
      border: 1px solid var(--color-border);
      border-top: 4px solid var(--color-kinjiki);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow-subtle);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .suite-img-wrapper {
      position: relative;
      height: 200px;
    }
    .suite-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .capacity-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(43, 88, 108, 0.9);
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
    }
    .suite-content {
      padding: 24px;
    }
    .suite-content h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 13px;
      color: var(--color-ibushi);
      margin-bottom: 15px;
      height: 40px;
      overflow: hidden;
    }
    .price-box {
      background: var(--surface);
      padding: 12px 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }
    .price-base {
      font-size: 18px;
      color: var(--color-matsu);
    }
    .card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
      z-index: 2000;
    }
    .modal-card {
      background: white; padding: 30px; border-radius: 8px; width: 480px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; font-size: 12px; font-weight: 700; margin-bottom: 6px; }
    .form-group input, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #CCC; border-radius: 4px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  `]
})
export class AdminRoomTypesComponent implements OnInit {
  private roomService = inject(RoomService);
  private http = inject(HttpClient);

  roomTypes: RoomType[] = [];
  showModal = false;
  isEditMode = false;
  currentType: Partial<RoomType> = {};

  ngOnInit() {
    this.loadData();
  }

  getTypeId(type: RoomType): number {
    return type.idTipo || type.idTipoHabitacion || 0;
  }

  loadData() {
    this.roomService.getAllRoomTypes().subscribe({
      next: (data) => this.roomTypes = data,
      error: () => {
        this.roomTypes = [
          { idTipo: 1, idTipoHabitacion: 1, nameType: 'Suite Ryokan Sora', description: 'Habitación con futón de seda tradicional y Onsen privado al aire libre.', basePrice: 450, capacityAdults: 2, capacityChildren: 1, hasOnsen: true, viewType: 'Jardín Zen' },
          { idTipo: 2, idTipoHabitacion: 2, nameType: 'Habitación Tatami Mizu', description: 'Suite amplia con suelos de Tatami y bañera de madera Hinoki.', basePrice: 320, capacityAdults: 2, capacityChildren: 2, hasOnsen: false, viewType: 'Bosque de Bambú' }
        ];
      }
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.currentType = { nameType: '', basePrice: 350, capacityAdults: 2 };
    this.showModal = true;
  }

  openEditModal(type: RoomType) {
    this.isEditMode = true;
    this.currentType = { ...type };
    this.showModal = true;
  }

  saveType() {
    const apiUrl = 'http://localhost:8080/api/room-types';
    const typeId = this.getTypeId(this.currentType as RoomType);
    if (this.isEditMode && typeId) {
      this.http.put(`${apiUrl}/${typeId}`, this.currentType, { withCredentials: true }).subscribe({
        next: () => { this.showModal = false; this.loadData(); },
        error: () => { this.showModal = false; }
      });
    } else {
      this.http.post(apiUrl, this.currentType, { withCredentials: true }).subscribe({
        next: () => { this.showModal = false; this.loadData(); },
        error: () => { this.showModal = false; }
      });
    }
  }

  deleteType(id: number) {
    if (!id) return;
    if (confirm('¿Está seguro de eliminar esta categoría de suite y sus datos vinculados en la base de datos real?')) {
      this.http.delete(`http://localhost:8080/api/room-types/${id}`, { withCredentials: true }).subscribe({
        next: () => {
          this.loadData();
        },
        error: (err) => {
          console.error('Error al eliminar tipo de habitación:', err);
          alert('Error al eliminar en la base de datos: ' + (err.error?.message || err.message || 'Error del servidor'));
          this.loadData();
        }
      });
    }
  }
}
