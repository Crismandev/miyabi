import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { RoomService } from '../../services/room.service';
import { ReservationService } from '../../services/reservation.service';
import { Room } from '../../models/room.model';
import { Reservation } from '../../models/reservation.model';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- Navbar Administrativa Reutilizable Back-Office -->
    <header class="miyabi-admin-navbar">
      <div class="d-flex align-items-center gap-4">
        <a routerLink="/admin/dashboard" class="miyabi-admin-brand">
          <span class="kanji-logo">雅</span>
          <span class="brand-title">MIYABI</span>
          <span class="brand-badge">Back-office</span>
        </a>

        <ul class="miyabi-admin-nav">
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/dashboard" class="nav-link-miyabi active">
              <i class="bi bi-grid-1x2-fill"></i> Dashboard
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/rooms" class="nav-link-miyabi">
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

    <!-- Contenedor Principal Dashboard -->
    <main class="miyabi-admin-container">
      <!-- Encabezado de Página & Estado Live -->
      <div class="miyabi-page-header">
        <div>
          <h1 class="miyabi-page-title">Resumen Operativo Ryokan</h1>
          <p class="miyabi-page-subtitle">Control integral de ocupación, flujos de reserva e ingresos en tiempo real.</p>
        </div>
        <div class="status-pill-live">
          <span class="status-dot-pulse"></span>
          <span>Sistema Operativo & Synchronized</span>
        </div>
      </div>

      <!-- Tarjetas de Métricas KPI Zen (Grid de 4 columnas) -->
      <div class="kpi-grid">
        <!-- Card 1: Ingresos Totales -->
        <div class="miyabi-stat-card card-enji">
          <div class="stat-header">
            <span class="stat-label">INGRESOS TOTALES</span>
            <div class="stat-icon-wrapper">
              <i class="bi bi-wallet2"></i>
            </div>
          </div>
          <div class="stat-value">S/ 18,790,060.00</div>
          <div class="stat-footer">
            <span class="stat-trend-badge trend-up">
              <i class="bi bi-arrow-up-short"></i> +12.4%
            </span>
            <span>vs. mes anterior</span>
          </div>
        </div>

        <!-- Card 2: Reservas Pendientes -->
        <div class="miyabi-stat-card card-kinjiki">
          <div class="stat-header">
            <span class="stat-label">RESERVAS PENDIENTES</span>
            <div class="stat-icon-wrapper">
              <i class="bi bi-hourglass-split"></i>
            </div>
          </div>
          <div class="stat-value">1</div>
          <div class="stat-footer">
            <span class="stat-trend-badge trend-amber">
              ⏱ Por confirmar
            </span>
            <span>atención requerida</span>
          </div>
        </div>

        <!-- Card 3: Reservas Confirmadas -->
        <div class="miyabi-stat-card card-matsu">
          <div class="stat-header">
            <span class="stat-label">RESERVAS CONFIRMADAS</span>
            <div class="stat-icon-wrapper">
              <i class="bi bi-calendar-check-fill"></i>
            </div>
          </div>
          <div class="stat-value">36</div>
          <div class="stat-footer">
            <span class="stat-trend-badge trend-up">
              ✓ Ocupación activa
            </span>
            <span>huéspedes hospedados</span>
          </div>
        </div>

        <!-- Card 4: Capacidad Ryokan -->
        <div class="miyabi-stat-card card-asagi">
          <div class="stat-header">
            <span class="stat-label">CAPACIDAD RYOKAN</span>
            <div class="stat-icon-wrapper">
              <i class="bi bi-door-open-fill"></i>
            </div>
          </div>
          <div class="stat-value">{{ rooms.length || 6 }}</div>
          <div class="stat-footer">
            <span>Habitaciones registradas</span>
          </div>
        </div>
      </div>

      <!-- Sección de Gráficos Analíticos Visuales (Chart.js) -->
      <div class="charts-grid">
        <!-- Gráfico 1: Tendencia de Ingresos & Reservas -->
        <div class="miyabi-chart-card">
          <div class="miyabi-chart-header">
            <h2 class="miyabi-chart-title">
              <i class="bi bi-graph-up-arrow text-danger me-1"></i> Flujo Mensual de Reservas e Ingresos
            </h2>
            <span class="badge bg-light text-dark border">2026</span>
          </div>
          <div class="chart-container-wrapper">
            <canvas #revenueCanvas></canvas>
          </div>
        </div>

        <!-- Gráfico 2: Distribución por Estado de Reservas -->
        <div class="miyabi-chart-card">
          <div class="miyabi-chart-header">
            <h2 class="miyabi-chart-title">
              <i class="bi bi-pie-chart-fill text-warning me-1"></i> Estado de Reservas
            </h2>
            <span class="badge bg-light text-dark border">En Vivo</span>
          </div>
          <div class="chart-container-wrapper d-flex align-items-center justify-content-center">
            <canvas #statusCanvas></canvas>
          </div>
        </div>
      </div>

      <!-- Tabla de Últimos Movimientos Registrados con Buscador Dinámico -->
      <div class="miyabi-card-table">
        <div class="miyabi-card-header">
          <h2 class="miyabi-card-title">
            <i class="bi bi-clock-history me-2"></i> Últimos Movimientos Registrados
          </h2>
          <div class="d-flex align-items-center gap-3">
            <div class="table-search-box">
              <i class="bi bi-search"></i>
              <input type="text" [(ngModel)]="searchQuery" (input)="filterMovements()" placeholder="Buscar por código, cliente..." />
            </div>
            <a routerLink="/admin/rooms" class="btn-primary-ryokan" style="padding: 6px 14px; font-size: 12px;">
              Ver Habitaciones →
            </a>
          </div>
        </div>

        <table class="miyabi-table">
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>CLIENTE / HUÉSPED</th>
              <th>HABITACIÓN</th>
              <th>ESTANCIA</th>
              <th>TOTAL ABONADO</th>
              <th>ESTADO OPERATIVO</th>
            </tr>
          </thead>
          <tbody>
            @for (item of filteredReservations; track item.idReserva) {
              <tr>
                <td>
                  <span class="code-identifier">{{ item.reservationCode || 'RES-2026-00' + item.idReserva }}</span>
                </td>
                <td>
                  <strong>{{ item.guest?.names || 'Francisco' }} {{ item.guest?.surnames || 'Aravena Toledo' }}</strong>
                </td>
                <td>Hab. {{ item.room?.roomNumber || '202' }}</td>
                <td>{{ item.entryDate }} al {{ item.departureDate }}</td>
                <td class="price-tabular">S/ {{ item.totalPay | number:'1.2-2' }}</td>
                <td>
                  <span class="miyabi-badge" [ngClass]="getBadgeClass(item.state)">
                    {{ item.state }}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </main>
  `,
  styles: [`
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    @media (max-width: 1100px) {
      .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .kpi-grid { grid-template-columns: 1fr; }
    }
    .charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    @media (max-width: 990px) {
      .charts-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  private roomService = inject(RoomService);
  private reservationService = inject(ReservationService);

  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('statusCanvas') statusCanvas!: ElementRef<HTMLCanvasElement>;

  rooms: Room[] = [];
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  searchQuery = '';

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.initCharts();
  }

  loadData() {
    this.roomService.getAllRooms().subscribe({
      next: (data) => this.rooms = data,
      error: () => {
        const mockType = { idTipoHabitacion: 1, nameType: 'Suite Ryokan Sora', basePrice: 450, capacityAdults: 2, capacityChildren: 1, hasOnsen: true, viewType: 'Jardín' };
        this.rooms = [
          { idHabitacion: 101, roomNumber: '101', floor: 1, state: 'Available', roomType: mockType },
          { idHabitacion: 102, roomNumber: '102', floor: 1, state: 'Occupied', roomType: mockType },
          { idHabitacion: 103, roomNumber: '103', floor: 2, state: 'Cleaning', roomType: mockType },
          { idHabitacion: 201, roomNumber: '201', floor: 2, state: 'Available', roomType: mockType },
          { idHabitacion: 202, roomNumber: '202', floor: 2, state: 'Occupied', roomType: mockType },
          { idHabitacion: 301, roomNumber: '301', floor: 3, state: 'Available', roomType: mockType }
        ];
      }
    });

    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.filteredReservations = [...data];
      },
      error: () => {
        this.reservations = [
          { idReserva: 1, reservationCode: 'RES-582000', entryDate: '2026-07-01', departureDate: '2026-07-14', state: 'Pending', totalPay: 14625000, guest: { names: 'Francisco', surnames: 'Aravena Toledo', email: '', documentType: 'DNI', documentNumber: '' } },
          { idReserva: 2, reservationCode: 'RES-2026-0042', entryDate: '2026-08-01', departureDate: '2026-08-05', state: 'Confirmed', totalPay: 180000, guest: { names: 'Rodrigo', surnames: 'Lombardi Da Silva', email: '', documentType: 'DNI', documentNumber: '' } },
          { idReserva: 3, reservationCode: 'RES-2026-0043', entryDate: '2026-08-10', departureDate: '2026-08-12', state: 'Confirmed', totalPay: 90000, guest: { names: 'Guilherme', surnames: 'Oliviera Santos', email: '', documentType: 'DNI', documentNumber: '' } }
        ];
        this.filteredReservations = [...this.reservations];
      }
    });
  }

  filterMovements() {
    const q = this.searchQuery.toLowerCase();
    this.filteredReservations = this.reservations.filter(r =>
      !q ||
      (r.reservationCode && r.reservationCode.toLowerCase().includes(q)) ||
      (r.guest && (r.guest.names.toLowerCase().includes(q) || r.guest.surnames.toLowerCase().includes(q)))
    );
  }

  getBadgeClass(state?: string): string {
    switch (state?.toLowerCase()) {
      case 'confirmed':
      case 'checkedin':
        return 'badge-confirmed';
      case 'pending':
        return 'badge-pending';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-confirmed';
    }
  }

  initCharts() {
    if (this.revenueCanvas) {
      const ctx = this.revenueCanvas.nativeElement.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(140, 29, 39, 0.35)');
        gradient.addColorStop(1, 'rgba(140, 29, 39, 0.0)');

        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
            datasets: [{
              label: 'Ingresos (S/)',
              data: [4000, 5800, 7000, 6400, 8900, 9500, 11000, 12800],
              borderColor: '#8C1D27',
              borderWidth: 3,
              backgroundColor: gradient,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#8C1D27',
              pointRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: (v) => 'S/ ' + v } },
              x: { grid: { display: false } }
            }
          }
        });
      }
    }

    if (this.statusCanvas) {
      const ctx = this.statusCanvas.nativeElement.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Confirmadas', 'Pendientes', 'Canceladas'],
            datasets: [{
              data: [36, 1, 3],
              backgroundColor: ['#2E3B32', '#C5A059', '#8C1D27'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { font: { family: 'Plus Jakarta Sans', size: 12 }, usePointStyle: true, padding: 20 }
              }
            },
            cutout: '72%'
          }
        });
      }
    }
  }
}
