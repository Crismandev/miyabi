import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  template: `
    <!-- Header Navbar Sticky Minimalista Ryokan -->
    <header class="miyabi-navbar" id="main-nav">
      <!-- Logo Izquierda -->
      <div class="nav-left">
        <a routerLink="/" class="logo" (click)="isSideMenuOpen = false">
          <img src="img/logo.png" alt="Miyabi Ryokan" />
        </a>
      </div>

      <!-- Acciones Derecha -->
      <div class="nav-right">
        <a routerLink="/reservation" class="btn-booking">Reservas</a>

        @if (authService.currentUser().isLoggedIn) {
          <div class="profile-wrapper">
            <button class="profile-badge" (click)="toggleProfileModal($event)">
              {{ getInitials(authService.currentUser().guestName) }}
            </button>

            @if (showProfileModal) {
              <div class="profile-modal">
                <div class="profile-info">
                  <strong>{{ authService.currentUser().guestName }}</strong>
                  <small>{{ authService.currentUser().role }}</small>
                </div>
                <hr />
                <a routerLink="/my-reservations" (click)="showProfileModal = false" class="profile-link">Mis Reservas</a>
                @if (authService.currentUser().role !== 'GUEST') {
                  <a routerLink="/admin/dashboard" (click)="showProfileModal = false" class="profile-link admin-link">Panel Admin</a>
                  <a routerLink="/admin/reports" (click)="showProfileModal = false" class="profile-link admin-link">Reportes</a>
                }
                <a (click)="logout()" class="profile-link logout-btn">Finalizar Sesión</a>
              </div>
            }
          </div>
        } @else {
          <div class="login-wrapper">
            <button class="btn-login-trigger" (click)="toggleLoginModal($event)">Iniciar Sesión</button>

            @if (showLoginModal) {
              <div class="login-modal">
                <div class="login-modal-header">
                  <h3>Account Sign In</h3>
                  <button class="close-login-btn" (click)="toggleLoginModal($event)">✕</button>
                </div>
                <form (ngSubmit)="onLogin()">
                  <div class="input-group">
                    <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required />
                  </div>
                  <div class="input-group">
                    <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required />
                  </div>
                  @if (errorMessage) {
                    <p class="error-msg">{{ errorMessage }}</p>
                  }
                  <button type="submit" class="btn-sign-in">INICIAR SESIÓN</button>
                </form>
                <hr class="login-divider" />
                <p class="create-account-text">¿No tienes cuenta? Registra tu historial de pedidos y reservas.</p>
                <a routerLink="/register" (click)="showLoginModal = false" class="create-link">Crear una cuenta</a>
              </div>
            }
          </div>
        }

        <!-- Botón Hamburguesa tres líneas que se transforman en X -->
        <button class="hamburger-btn" [class.active]="isSideMenuOpen" (click)="toggleSideMenu()">
          <span class="line top"></span>
          <span class="line middle"></span>
          <span class="line bottom"></span>
        </button>
      </div>

      <!-- Menú Deslizante Lateral (Side Menu Ryokan) -->
      <div class="side-menu" [class.open]="isSideMenuOpen">
        <nav class="menu-links">
          <a routerLink="/" (click)="closeSideMenu()" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a>
          <a routerLink="/rooms" (click)="closeSideMenu()" routerLinkActive="active">Habitaciones</a>
          <a routerLink="/facilities" (click)="closeSideMenu()" routerLinkActive="active">Instalaciones</a>
          <a routerLink="/cuisine" (click)="closeSideMenu()" routerLinkActive="active">Cocina Kaiseki Horin</a>
          <a routerLink="/spa" (click)="closeSideMenu()" routerLinkActive="active">Spa Entei</a>
          <a routerLink="/amenities" (click)="closeSideMenu()" routerLinkActive="active">Amenidades de Yakushiyama</a>
          <a routerLink="/experiences" (click)="closeSideMenu()" routerLinkActive="active">Experiencias Privadas Únicas</a>
          <a routerLink="/stay-offers" (click)="closeSideMenu()" routerLinkActive="active">Ofertas de Estancia</a>
          <a routerLink="/location" (click)="closeSideMenu()" routerLinkActive="active">Acceso</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .miyabi-navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 50px;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      background-color: rgba(248, 247, 244, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    }
    .nav-left .logo img {
      height: 35px;
      width: auto;
      display: block;
      transition: opacity 0.3s ease;
    }
    .nav-right {
      display: flex;
      align-items: center;
      gap: 25px;
      z-index: 1001;
    }
    .btn-booking {
      border: 1px solid var(--color-enji);
      background-color: var(--color-enji);
      border-radius: 2px;
      padding: 6px 20px;
      text-decoration: none;
      color: #FFFFFF !important;
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      transition: all 0.3s ease;
    }
    .btn-booking:hover {
      background-color: var(--color-enji-hover);
      border-color: var(--color-enji-hover);
    }
    .btn-login-trigger {
      background: none;
      border: none;
      color: var(--color-sumi);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      cursor: pointer;
    }
    .hamburger-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 30px;
      z-index: 1002;
    }
    .hamburger-btn .line {
      width: 100%;
      height: 1px;
      background-color: var(--color-sumi);
      transition: transform 0.4s ease, opacity 0.4s ease;
    }
    .hamburger-btn.active .top {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger-btn.active .middle {
      opacity: 0;
    }
    .hamburger-btn.active .bottom {
      transform: translateY(-7px) rotate(-45deg);
    }
    .side-menu {
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100vh;
      background-color: var(--background);
      display: flex;
      align-items: flex-start;
      padding-top: 100px;
      padding-left: 40px;
      transform: translateX(100%);
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 999;
      box-shadow: -10px 0 30px rgba(0,0,0,0.05);
    }
    .side-menu.open {
      transform: translateX(0);
    }
    .menu-links {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .menu-links a {
      text-decoration: none;
      color: var(--color-sumi);
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 1.5px;
      transition: color 0.3s ease;
    }
    .menu-links a:hover, .menu-links a.active {
      color: var(--color-enji);
    }
    .login-wrapper, .profile-wrapper {
      position: relative;
    }
    .login-modal, .profile-modal {
      position: absolute;
      top: 40px;
      right: 0;
      width: 280px;
      background: white;
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-zen-elevated);
      padding: 20px;
      z-index: 2000;
      border-radius: 2px;
    }
    .login-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .close-login-btn {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
    .input-group {
      margin-bottom: 12px;
    }
    .input-group input {
      width: 100%;
      padding: 8px;
      border: 1px solid #CCC;
      border-radius: 2px;
      font-size: 13px;
    }
    .btn-sign-in {
      width: 100%;
      background: var(--color-enji);
      color: white;
      border: none;
      padding: 10px;
      font-size: 12px;
      letter-spacing: 1px;
      cursor: pointer;
    }
    .error-msg {
      color: var(--color-enji);
      font-size: 12px;
      margin-bottom: 10px;
    }
    .profile-badge {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--color-enji);
      color: white;
      border: none;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
    }
    .profile-link {
      display: block;
      padding: 6px 0;
      color: var(--color-sumi);
      text-decoration: none;
      font-size: 13px;
      cursor: pointer;
    }
    .admin-link {
      color: var(--color-asagi);
      font-weight: 600;
    }
    .logout-btn {
      color: var(--color-enji);
    }
    .login-divider {
      margin: 15px 0;
      border: 0;
      border-top: 1px solid #EEE;
    }
    .create-account-text {
      font-size: 11px;
      color: #666;
      margin-bottom: 8px;
    }
    .create-link {
      font-size: 12px;
      color: var(--color-enji);
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isSideMenuOpen = false;
  showLoginModal = false;
  showProfileModal = false;
  email = '';
  password = '';
  errorMessage = '';

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  closeSideMenu() {
    this.isSideMenuOpen = false;
  }

  toggleLoginModal(event: Event) {
    event.stopPropagation();
    this.showLoginModal = !this.showLoginModal;
    this.errorMessage = '';
  }

  toggleProfileModal(event: Event) {
    event.stopPropagation();
    this.showProfileModal = !this.showProfileModal;
  }

  onLogin() {
    if (!this.email || !this.password) return;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.showLoginModal = false;
        this.email = '';
        this.password = '';
        if (res.role && res.role !== 'GUEST') {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error || 'Credenciales incorrectas';
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.showProfileModal = false;
      this.router.navigate(['/']);
    });
  }

  getInitials(name?: string): string {
    if (!name) return 'MY';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }
}
