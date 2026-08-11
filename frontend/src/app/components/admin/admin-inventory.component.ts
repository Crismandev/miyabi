import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { InventoryService, ServiceItem } from '../../services/inventory.service';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <main class="admin-container">
      <div class="content-wrapper">
        <!-- Header -->
        <div class="page-header">
          <div>
            <span class="section-tag">CATÁLOGO OPERATIVO DE HOTEL & SPA</span>
            <h1 class="page-title">Inventario de Productos y Servicios</h1>
            <p class="page-subtitle">Gestión de experiencias, bebidas de minibar, tratamientos de spa y amenities exclusivos de Ryokan Miyabi.</p>
          </div>
          <button class="btn-miyabi btn-miyabi-enji" (click)="openCreateModal()">
            + Nuevo Ítem / Servicio
          </button>
        </div>

        <!-- Tarjetas KPI -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">TOTAL ÍTEMS EN CATÁLOGO</div>
            <div class="kpi-value">{{ items.length }}</div>
            <span class="kpi-sub">Productos y servicios registrados</span>
          </div>
          <div class="kpi-card success">
            <div class="kpi-label">DISPONIBLES A LA VENTA</div>
            <div class="kpi-value text-success">{{ availableCount }}</div>
            <span class="kpi-sub">Habilitados para huéspedes</span>
          </div>
          <div class="kpi-card info">
            <div class="kpi-label">CATEGORÍAS ACTIVAS</div>
            <div class="kpi-value text-info">{{ categoriesCount }}</div>
            <span class="kpi-sub">Bebidas, Spa, Gastronomía, etc.</span>
          </div>
        </div>

        <!-- Filtros -->
        <div class="filter-card">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar ítem por nombre o descripción..." 
              [(ngModel)]="searchQuery"
              (input)="filterItems()"
            />
          </div>
          <div class="status-filter">
            <label>Categoría:</label>
            <select [(ngModel)]="categoryFilter" (change)="filterItems()">
              <option value="ALL">Todas las Categorías</option>
              <option value="Bebidas">Bebidas & Minibar</option>
              <option value="Gastronomía">Gastronomía & Restaurante</option>
              <option value="Spa">Spa & Bienestar</option>
              <option value="Amenities">Amenities & Cuidado Personal</option>
              <option value="Activities">Actividades & Experiencias</option>
            </select>
          </div>
        </div>

        <!-- Tabla -->
        <div class="table-card">
          <div class="table-header">
            <h3>Catálogo de Servicios Registrados</h3>
            <span class="badge-count">{{ filteredItems.length }} Ítems</span>
          </div>
          <div class="table-responsive">
            <table class="miyabi-table">
              <thead>
                <tr>
                  <th>ÍTEM / SERVICIO</th>
                  <th>CATEGORÍA</th>
                  <th>TEMPORADA</th>
                  <th>PRECIO UNITARIO</th>
                  <th>ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                @for (item of filteredItems; track getItemId(item)) {
                  <tr>
                    <td>
                      <div class="item-info">
                        <strong>{{ item.serviceName }}</strong>
                        <small class="text-muted">{{ item.description || 'Sin descripción' }}</small>
                      </div>
                    </td>
                    <td>
                      <span class="category-pill">{{ item.category || 'General' }}</span>
                    </td>
                    <td>
                      <span class="season-text">{{ item.season || 'All year' }}</span>
                    </td>
                    <td class="font-mono font-bold text-gold">
                      S/ {{ (item.price || 0) | number:'1.2-2' }}
                    </td>
                    <td>
                      <span class="status-badge" [ngClass]="item.available ? 'status-active' : 'status-inactive'">
                        ● {{ item.available ? 'Disponible' : 'No disponible' }}
                      </span>
                    </td>
                    <td>
                      <div class="action-buttons">
                        <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm" (click)="openEditModal(item)">
                          ✏️ Editar
                        </button>
                        <button class="btn-miyabi btn-miyabi-sm text-danger" (click)="deleteItem(getItemId(item))">
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="text-center py-5 text-muted">
                      No se encontraron productos o servicios registradas.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Formulario CRUD -->
    @if (showModal) {
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'Editar Ítem del Catálogo' : 'Nuevo Ítem / Servicio' }}</h3>
            <button class="close-btn" (click)="showModal = false">✕</button>
          </div>
          <form (ngSubmit)="saveItem()">
            <div class="form-group">
              <label>Nombre del Producto / Servicio</label>
              <input type="text" [(ngModel)]="currentItem.serviceName" name="serviceName" placeholder="Ej. Sake Junmai Daiginjo" required />
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea [(ngModel)]="currentItem.description" name="description" rows="2" placeholder="Detalles de preparación o presentación..."></textarea>
            </div>
            <div class="form-group">
              <label>Precio Unitario (S/)</label>
              <input type="number" [(ngModel)]="currentItem.price" name="price" step="0.5" required />
            </div>
            <div class="form-group">
              <label>Categoría</label>
              <select [(ngModel)]="currentItem.category" name="category" required>
                <option value="Bebidas">Bebidas & Minibar</option>
                <option value="Gastronomía">Gastronomía & Restaurante</option>
                <option value="Spa">Spa & Bienestar</option>
                <option value="Amenities">Amenities & Cuidado Personal</option>
                <option value="Activities">Actividades & Experiencias</option>
              </select>
            </div>
            <div class="form-group">
              <label>Temporada</label>
              <select [(ngModel)]="currentItem.season" name="season" required>
                <option value="All year">All year (Todo el año)</option>
                <option value="Spring">Spring (Primavera)</option>
                <option value="Summer">Summer (Verano)</option>
                <option value="Autumn">Autumn (Otoño)</option>
                <option value="Winter">Winter (Invierno)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Disponibilidad</label>
              <select [(ngModel)]="currentItem.available" name="available" required>
                <option [value]="1">Disponible a la venta</option>
                <option [value]="0">Fuera de stock / Inactivo</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-miyabi btn-miyabi-outline" (click)="showModal = false">Cancelar</button>
              <button type="submit" class="btn-miyabi btn-miyabi-enji">Guardar Ítem</button>
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

    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
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
    .category-pill { background: #F5F2EB; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 12px; }
    .season-text { font-size: 13px; color: #555; }
    
    .status-badge { font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 20px; }
    .status-active { background: #D4EDDA; color: #155724; }
    .status-inactive { background: #F8D7DA; color: #721C24; }

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
export class AdminInventoryComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  items: ServiceItem[] = [];
  filteredItems: ServiceItem[] = [];

  searchQuery = '';
  categoryFilter = 'ALL';

  availableCount = 0;
  categoriesCount = 0;

  showModal = false;
  isEditMode = false;
  currentItem: Partial<ServiceItem> = {};

  ngOnInit() {
    this.loadData();
  }

  getItemId(item: ServiceItem): number {
    return item.serviceId || item.idServicio || 0;
  }

  loadData() {
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.calculateMetrics();
        this.filterItems();
      },
      error: () => {
        this.items = [];
        this.filterItems();
      }
    });
  }

  calculateMetrics() {
    this.availableCount = this.items.filter(i => i.available === 1).length;
    const cats = new Set(this.items.map(i => i.category || 'General'));
    this.categoriesCount = cats.size;
  }

  filterItems() {
    const q = this.searchQuery.toLowerCase();
    this.filteredItems = this.items.filter(i => {
      const matchQuery = !q ||
        (i.serviceName || '').toLowerCase().includes(q) ||
        (i.description || '').toLowerCase().includes(q);

      const matchCategory = this.categoryFilter === 'ALL' || (i.category || '') === this.categoryFilter;

      return matchQuery && matchCategory;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.currentItem = { serviceName: '', description: '', price: 50, category: 'Bebidas', season: 'All year', available: 1 };
    this.showModal = true;
  }

  openEditModal(item: ServiceItem) {
    this.isEditMode = true;
    this.currentItem = { ...item };
    this.showModal = true;
  }

  saveItem() {
    const id = this.getItemId(this.currentItem as ServiceItem);
    const itemToSave: ServiceItem = {
      serviceId: id || undefined,
      idServicio: id || undefined,
      serviceName: this.currentItem.serviceName || 'Nuevo servicio',
      description: this.currentItem.description || '',
      price: Number(this.currentItem.price || 0),
      category: this.currentItem.category || 'Bebidas',
      season: this.currentItem.season || 'All year',
      available: Number(this.currentItem.available ?? 1)
    };

    if (this.isEditMode && id) {
      this.inventoryService.updateItem(id, itemToSave).subscribe({
        next: () => { this.showModal = false; this.loadData(); },
        error: () => { this.showModal = false; this.loadData(); }
      });
    } else {
      this.inventoryService.createItem(itemToSave).subscribe({
        next: () => { this.showModal = false; this.loadData(); },
        error: () => { this.showModal = false; this.loadData(); }
      });
    }
  }

  deleteItem(id: number) {
    if (!id) return;
    if (confirm('¿Está seguro de eliminar este producto del inventario?')) {
      this.inventoryService.deleteItem(id).subscribe({
        next: () => this.loadData(),
        error: () => this.loadData()
      });
    }
  }
}
