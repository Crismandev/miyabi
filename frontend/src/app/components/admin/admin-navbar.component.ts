import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="miyabi-admin-navbar">
      <div class="d-flex align-items-center gap-4">
        <a routerLink="/admin/dashboard" class="miyabi-admin-brand">
          <span class="kanji-logo">雅</span>
          <span class="brand-title">MIYABI</span>
          <span class="brand-badge">Back-office</span>
        </a>

        <ul class="miyabi-admin-nav">
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-link-miyabi">
              <i class="bi bi-grid-1x2-fill"></i> Dashboard
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/rooms" routerLinkActive="active" class="nav-link-miyabi">
              <i class="bi bi-door-open-fill"></i> Habitaciones
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/room-types" routerLinkActive="active" class="nav-link-miyabi">
              <i class="bi bi-tags-fill"></i> Tarifas & Suites
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/reservations" routerLinkActive="active" class="nav-link-miyabi">
              <i class="bi bi-calendar-check-fill"></i> Reservas
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/inventory" routerLinkActive="active" class="nav-link-miyabi">
              <i class="bi bi-box-seam-fill"></i> Inventario
            </a>
          </li>
          <!-- Vistas exclusivas del Administrador (Ocultas para Recepcionista y Personal) -->
          @if (isAdmin) {
            <li class="miyabi-admin-nav-item">
              <a routerLink="/admin/movements" routerLinkActive="active" class="nav-link-miyabi">
                <i class="bi bi-clock-history"></i> Movimientos
              </a>
            </li>
            <li class="miyabi-admin-nav-item">
              <a routerLink="/admin/users" routerLinkActive="active" class="nav-link-miyabi">
                <i class="bi bi-people-fill"></i> Personal
              </a>
            </li>
            <li class="miyabi-admin-nav-item">
              <a routerLink="/admin/reports" routerLinkActive="active" class="nav-link-miyabi">
                <i class="bi bi-bar-chart-fill"></i> Reportes
              </a>
            </li>
          }
        </ul>
      </div>

      <div class="admin-navbar-actions">
        <div class="admin-profile-pill">
          <span class="admin-avatar">{{ avatarInitial }}</span>
          <div class="admin-user-info">
            <span class="admin-name">{{ userName }}</span>
            <span class="admin-role">{{ displayRole }}</span>
          </div>
        </div>

        <button (click)="logout()" class="btn-miyabi btn-miyabi-sm btn-miyabi-outline-enji ms-2" title="Cerrar sesión">
          <i class="bi bi-box-arrow-right"></i> Salir
        </button>

        <a routerLink="/" class="btn-view-site">
          <i class="bi bi-box-arrow-up-right"></i> VER PORTAL WEB
        </a>
      </div>
    </header>
  `
})
export class AdminNavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  get session() {
    return this.authService.currentUser();
  }

  get userName(): string {
    return this.session.guestName || 'Personal Ryokan';
  }

  get rawRole(): string {
    return this.session.role ? this.session.role.toUpperCase() : '';
  }

  get isAdmin(): boolean {
    return this.rawRole === 'ADMINISTRATOR' || this.rawRole === 'ADMIN';
  }

  get displayRole(): string {
    if (this.isAdmin) return 'Administrador';
    if (this.rawRole === 'RECEPTIONIST' || this.rawRole === 'RECEPCIONISTA') return 'Recepcionista';
    if (this.rawRole === 'CUARTELERO' || this.rawRole === 'STAFF') return 'Personal Staff';
    return this.session.role || 'Personal';
  }

  get avatarInitial(): string {
    const name = this.userName.trim();
    return name ? name.charAt(0).toUpperCase() : 'U';
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
