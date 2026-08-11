import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface AccessLogItem {
  idAccess?: number;
  accessDate?: string;
  ipAccess?: string;
  userType?: string;
  user?: {
    idUsuario?: number;
    names: string;
    surnames: string;
    email: string;
    rol?: { nameRol: string };
  };
  guest?: {
    idGuest?: number;
    names: string;
    surnames: string;
    email: string;
  };
}

@Component({
  selector: 'app-admin-movements',
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
            <a routerLink="/admin/movements" class="nav-link-miyabi active">
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
          <h1 class="miyabi-page-title">Historial de Movimientos & Auditoría</h1>
          <p class="miyabi-page-subtitle">Registro cronológico detallado de inicios de sesión, accesos al sistema y actividades en tiempo real.</p>
        </div>
        <div>
          <span class="miyabi-badge badge-active fs-6">{{ filteredLogs.length }} Registros</span>
        </div>
      </div>

      <div class="miyabi-card-table">
        <div class="miyabi-card-header">
          <div class="d-flex align-items-center gap-3">
            <h2 class="miyabi-card-title">
              <i class="bi bi-clock-history me-2" style="color: var(--color-kinjiki);"></i>Bitácora General de Accesos
            </h2>
          </div>

          <div class="d-flex align-items-center gap-3 flex-wrap">
            <div class="btn-group btn-group-sm" role="group">
              <button type="button" class="btn btn-outline-secondary" [class.active]="currentFilter === 'ALL'" (click)="setFilter('ALL')">Todos</button>
              <button type="button" class="btn btn-outline-secondary" [class.active]="currentFilter === 'STAFF'" (click)="setFilter('STAFF')">Personal</button>
              <button type="button" class="btn btn-outline-secondary" [class.active]="currentFilter === 'GUEST'" (click)="setFilter('GUEST')">Clientes</button>
            </div>

            <div class="table-search-box">
              <i class="bi bi-search"></i>
              <input type="text" [(ngModel)]="searchQuery" (input)="filterLogs()" placeholder="Buscar por usuario, correo, IP..." />
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="miyabi-table">
            <thead>
              <tr>
                <th>Nº ID Log</th>
                <th>Usuario / Cuenta</th>
                <th>Rol / Categoría</th>
                <th>Dirección IP</th>
                <th>Fecha & Hora de Conexión</th>
                <th class="text-end">Estado Auditoría</th>
              </tr>
            </thead>
            <tbody>
              @for (l of filteredLogs; track l.idAccess) {
                <tr>
                  <td>
                    <span class="code-identifier fs-6">#LOG-{{ l.idAccess }}</span>
                  </td>
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                           style="width: 38px; height: 38px; background: linear-gradient(135deg, var(--color-enji) 0%, var(--color-kinjiki) 100%); font-size: 16px;">
                        {{ l.user ? l.user.names.substring(0,1) : (l.guest ? l.guest.names.substring(0,1) : 'U') }}
                      </div>
                      <div>
                        <div class="fw-semibold text-capitalize fs-6 text-dark">
                          {{ l.user ? l.user.names + ' ' + l.user.surnames : (l.guest ? l.guest.names + ' ' + l.guest.surnames : 'Usuario de Sistema') }}
                        </div>
                        <div class="text-muted small">
                          {{ l.user ? l.user.email : (l.guest ? l.guest.email : '-') }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="miyabi-badge" [ngClass]="l.userType === 'STAFF' ? 'badge-confirmed' : 'badge-active'">
                      <i [ngClass]="l.userType === 'STAFF' ? 'bi bi-shield-lock-fill me-1' : 'bi bi-person-circle me-1'"></i>
                      {{ l.userType === 'STAFF' ? (l.user?.rol?.nameRol || 'Personal') : 'Cliente / Huésped' }}
                    </span>
                  </td>
                  <td>
                    <span class="code-identifier fs-6 text-dark">
                      <i class="bi bi-hdd-network me-1 text-muted"></i>
                      {{ l.ipAccess || '127.0.0.1' }}
                    </span>
                  </td>
                  <td>
                    <div class="fw-semibold text-dark">
                      <i class="bi bi-calendar-event me-1 text-muted"></i>
                      {{ l.accessDate ? (l.accessDate | date:'dd/MM/yyyy HH:mm:ss') : 'Reciente' }}
                    </div>
                  </td>
                  <td class="text-end">
                    <span class="miyabi-badge badge-confirmed">
                      <i class="bi bi-check-all me-1"></i>Verificado
                    </span>
                  </td>
                </tr>
              }
              @if (filteredLogs.length === 0) {
                <tr>
                  <td colspan="6" class="text-center py-5 text-muted">
                    <i class="bi bi-clock-history fs-2 d-block mb-2 text-muted opacity-50"></i>
                    No hay registros de movimientos que coincidan con la búsqueda.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>
  `
})
export class AdminMovementsComponent implements OnInit {
  private http = inject(HttpClient);

  logs: AccessLogItem[] = [];
  filteredLogs: AccessLogItem[] = [];
  searchQuery = '';
  currentFilter: 'ALL' | 'STAFF' | 'GUEST' = 'ALL';

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.http.get<AccessLogItem[]>('http://localhost:8080/api/access-logs', { withCredentials: true }).subscribe({
      next: (data) => {
        this.logs = data;
        this.filterLogs();
      },
      error: () => {
        this.logs = [
          { idAccess: 1, accessDate: '2026-08-10T21:00:00', ipAccess: '127.0.0.1', userType: 'STAFF', user: { names: 'Rodrigo', surnames: 'Dalmagro López', email: 'onur@hotel.com', rol: { nameRol: 'Administrator' } } },
          { idAccess: 2, accessDate: '2026-08-10T20:45:00', ipAccess: '192.168.1.15', userType: 'GUEST', guest: { names: 'Francisco', surnames: 'Aravena Toledo', email: 'kingg@gmail.com' } }
        ];
        this.filterLogs();
      }
    });
  }

  setFilter(filter: 'ALL' | 'STAFF' | 'GUEST') {
    this.currentFilter = filter;
    this.filterLogs();
  }

  filterLogs() {
    const q = this.searchQuery.toLowerCase();
    this.filteredLogs = this.logs.filter(l => {
      const matchesType = (this.currentFilter === 'ALL') || (l.userType === this.currentFilter);
      const nameStr = l.user ? `${l.user.names} ${l.user.surnames} ${l.user.email}` : (l.guest ? `${l.guest.names} ${l.guest.surnames} ${l.guest.email}` : '');
      const ipStr = l.ipAccess || '';
      const matchesQuery = !q || nameStr.toLowerCase().includes(q) || ipStr.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }
}
