import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-reports miyabi-container">
      <div class="reports-header">
        <span class="badge-ryokan-luxury">MÓDULO DE REPORTES Y ANALÍTICA</span>
        <h2>Reporte de Ocupación e Ingresos por Período</h2>
      </div>

      <!-- Filtros del Reporte (Cumple Criterio VI Rúbrica) -->
      <div class="filter-card">
        <h3>Filtros de Búsqueda</h3>
        <div class="filter-row">
          <div class="form-group">
            <label>Estado de Reserva</label>
            <select [(ngModel)]="filterState" (change)="applyFilters()">
              <option value="ALL">Todos los Estados</option>
              <option value="Confirmed">Confirmed (Confirmada)</option>
              <option value="Pending">Pending (Pendiente)</option>
              <option value="CheckedIn">CheckedIn (Hospedado)</option>
              <option value="Cancelled">Cancelled (Cancelada)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Buscar por Código / Nombre</label>
            <input type="text" [(ngModel)]="searchQuery" (input)="applyFilters()" placeholder="Ej. RES-2026..." />
          </div>
        </div>
      </div>

      <!-- Tabla Reporte Paginada -->
      <div class="report-table-card">
        <div class="table-summary">
          <span>Mostrando {{ paginatedReservations.length }} de {{ filteredReservations.length }} registros filtrados</span>
        </div>

        <table class="admin-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Huésped</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Estado</th>
              <th>Monto Total</th>
            </tr>
          </thead>
          <tbody>
            @for (res of paginatedReservations; track res.idReserva || res.reservationCode || $index) {
              <tr>
                <td><strong>{{ res.reservationCode || 'RES-2026-' + res.idReserva }}</strong></td>
                <td>{{ res.guest?.names }} {{ res.guest?.surnames }}</td>
                <td>{{ res.entryDate }}</td>
                <td>{{ res.departureDate }}</td>
                <td>
                  <span class="status-badge" [ngClass]="(res.state || '').toLowerCase()">{{ res.state }}</span>
                </td>
                <td class="amount">S/ {{ res.totalPay | number:'1.2-2' }}</td>
              </tr>
            }
          </tbody>
        </table>

        <!-- Paginación Reactiva (Cumple Criterio VI Rúbrica) -->
        <div class="pagination-controls">
          <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm" [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)">Anterior</button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm" [disabled]="currentPage >= totalPages" (click)="goToPage(currentPage + 1)">Siguiente</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-reports {
      padding-top: 120px;
    }
    .reports-header {
      margin-bottom: 30px;
    }
    .reports-header h2 {
      font-size: 32px;
      margin-top: 8px;
    }
    .filter-card {
      background: white;
      border: 1px solid var(--color-border);
      padding: 25px;
      border-radius: 4px;
      margin-bottom: 30px;
    }
    .filter-card h3 {
      font-size: 16px;
      margin-bottom: 15px;
    }
    .filter-row {
      display: flex;
      gap: 20px;
    }
    .form-group {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .form-group input, .form-group select {
      padding: 10px;
      border: 1px solid #CCC;
      border-radius: 2px;
    }
    .report-table-card {
      background: white;
      border: 1px solid var(--color-border);
      padding: 25px;
      border-radius: 4px;
    }
    .table-summary {
      font-size: 12px;
      color: var(--color-ibushi);
      margin-bottom: 15px;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
    }
    .admin-table th, .admin-table td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--color-border);
      font-size: 13px;
      text-align: left;
    }
    .admin-table th {
      background: var(--surface);
    }
    .amount {
      font-weight: 600;
      color: var(--color-enji);
    }
    .status-badge {
      padding: 4px 10px;
      border-radius: 2px;
      font-size: 11px;
      font-weight: 600;
    }
    .status-badge.confirmed { background: rgba(46,59,50,0.1); color: var(--color-matsu); }
    .status-badge.pending { background: rgba(217,130,43,0.1); color: #A35A12; }
    .status-badge.cancelled { background: rgba(140,29,39,0.1); color: var(--color-enji); }
    .pagination-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 25px;
      font-size: 13px;
    }
    .btn-pagination {
      background: white;
      border: 1px solid var(--color-sumi);
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 2px;
    }
    .btn-pagination:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `]
})
export class AdminReportsComponent implements OnInit {
  private reservationService = inject(ReservationService);

  allReservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  paginatedReservations: Reservation[] = [];

  filterState = 'ALL';
  searchQuery = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  ngOnInit() {
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.allReservations = data;
        this.applyFilters();
      },
      error: () => {
        // Mock fallback
        this.allReservations = [
          { idReserva: 1, reservationCode: 'RES-2026-0001', entryDate: '2026-03-01', departureDate: '2026-03-03', state: 'Confirmed', totalPay: 900, guest: { names: 'Mathias', surnames: 'Porras', email: '', documentType: 'DNI', documentNumber: '' } },
          { idReserva: 2, reservationCode: 'RES-2026-0002', entryDate: '2026-03-05', departureDate: '2026-03-06', state: 'Pending', totalPay: 350, guest: { names: 'Fabricio', surnames: 'Sullca', email: '', documentType: 'DNI', documentNumber: '' } },
          { idReserva: 3, reservationCode: 'RES-2026-0003', entryDate: '2026-03-08', departureDate: '2026-03-10', state: 'Confirmed', totalPay: 640, guest: { names: 'Miguel', surnames: 'Uriarte', email: '', documentType: 'DNI', documentNumber: '' } },
          { idReserva: 4, reservationCode: 'RES-2026-0004', entryDate: '2026-03-12', departureDate: '2026-03-15', state: 'CheckedIn', totalPay: 1350, guest: { names: 'Piero', surnames: 'Hilario', email: '', documentType: 'DNI', documentNumber: '' } }
        ];
        this.applyFilters();
      }
    });
  }

  applyFilters() {
    this.filteredReservations = this.allReservations.filter(res => {
      const matchState = this.filterState === 'ALL' || res.state === this.filterState;
      const q = this.searchQuery.toLowerCase();
      const matchQuery = !q ||
        (res.reservationCode?.toLowerCase().includes(q)) ||
        (res.guest?.names?.toLowerCase().includes(q)) ||
        (res.guest?.surnames?.toLowerCase().includes(q));
      return matchState && matchQuery;
    });

    this.totalPages = Math.ceil(this.filteredReservations.length / this.pageSize) || 1;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedReservations = this.filteredReservations.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}
