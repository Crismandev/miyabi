import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <header
      class="fixed top-0 left-0 w-full h-[60px] md:h-[65px] z-[50] bg-[#f7f7f5] px-[26px] md:px-[60px] flex justify-between items-center transition-transform duration-500 ease-in-out"
      [class.-translate-y-full]="isHomePage() && !isScrolled() && !isMenuOpen()"
      [class.translate-y-0]="!isHomePage() || isScrolled() || isMenuOpen()"
    >
      <a
        routerLink="/"
        class="w-[128px] md:w-[138px] block z-[60]"
        (click)="closeMenu()"
      >
        <img src="img/logo.png" alt="Miyabi Ryokan" class="w-full h-auto" />
      </a>

      <div class="flex items-center gap-6 md:gap-8 z-[60]">
        <div class="hidden md:flex items-center gap-4">
          <a
            routerLink="/reservation"
            class="border border-gray-900 rounded-[4px] px-4 py-1.5 text-[12px] tracking-[0.15em] text-gray-900 uppercase hover:bg-gray-900 hover:text-white transition-colors"
          >
            Reservas
          </a>

          <div class="relative">
            @if (authService.currentUser().isLoggedIn) {
              <button
                (click)="toggleProfileModal($event)"
                class="border border-gray-900 rounded-[4px] px-4 py-1.5 text-[12px] tracking-[0.15em] text-gray-900 uppercase hover:bg-gray-900 hover:text-white transition-colors cursor-pointer"
              >
                {{ getInitials(authService.currentUser().guestName) }}
              </button>

              @if (showProfileModal()) {
                <div
                  class="absolute top-[40px] right-0 w-[250px] bg-white border border-gray-200 shadow-xl p-[20px] rounded-[4px] z-[2000]"
                >
                  <div class="mb-3">
                    <strong class="block text-gray-900 text-[14px]">{{
                      authService.currentUser().guestName
                    }}</strong>
                    <small class="text-gray-500 text-[12px]">{{
                      authService.currentUser().role
                    }}</small>
                  </div>
                  <hr class="border-gray-200 mb-3" />
                  <a
                    routerLink="/my-reservations"
                    (click)="showProfileModal.set(false)"
                    class="block py-1.5 text-[13px] text-gray-800 hover:text-gray-500 transition-colors"
                    >Mis Reservas</a
                  >

                  @if (authService.currentUser().role !== 'GUEST') {
                    <a
                      routerLink="/admin/dashboard"
                      (click)="showProfileModal.set(false)"
                      class="block py-1.5 text-[13px] font-semibold text-blue-800 hover:opacity-70 transition-opacity"
                      >Panel Admin</a
                    >
                    <a
                      routerLink="/admin/reports"
                      (click)="showProfileModal.set(false)"
                      class="block py-1.5 text-[13px] font-semibold text-blue-800 hover:opacity-70 transition-opacity"
                      >Reportes</a
                    >
                  }

                  <button
                    (click)="logout()"
                    class="block w-full text-left py-1.5 mt-2 text-[13px] font-semibold text-red-800 hover:opacity-70 transition-opacity"
                  >
                    Finalizar Sesión
                  </button>
                </div>
              }
            } @else {
              <button
                (click)="toggleLoginModal($event)"
                class="border border-gray-900 rounded-[4px] px-4 py-1.5 text-[12px] tracking-[0.15em] text-gray-900 uppercase hover:bg-gray-900 hover:text-white transition-colors cursor-pointer"
              >
                Iniciar Sesión
              </button>

              @if (showLoginModal()) {
                <div
                  class="absolute top-[40px] right-0 w-[280px] bg-white border border-gray-200 shadow-xl p-[20px] rounded-[4px] z-[2000]"
                >
                  <div class="flex justify-between items-center mb-[15px]">
                    <h3
                      class="text-[14px] font-semibold text-gray-900 tracking-wide"
                    >
                      Acceso
                    </h3>
                    <button
                      class="bg-transparent border-none text-[16px] cursor-pointer hover:opacity-70 text-gray-500"
                      (click)="toggleLoginModal($event)"
                    >
                      ✕
                    </button>
                  </div>

                  <form (ngSubmit)="onLogin()">
                    <div class="mb-[12px]">
                      <input
                        type="email"
                        [(ngModel)]="email"
                        name="email"
                        placeholder="Email"
                        required
                        class="w-full p-[8px] border border-gray-300 rounded-[4px] text-[13px] focus:outline-none focus:border-gray-900 transition-colors"
                      />
                    </div>
                    <div class="mb-[12px]">
                      <input
                        type="password"
                        [(ngModel)]="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                        class="w-full p-[8px] border border-gray-300 rounded-[4px] text-[13px] focus:outline-none focus:border-gray-900 transition-colors"
                      />
                    </div>

                    @if (errorMessage()) {
                      <p class="text-red-700 text-[12px] mb-[10px]">
                        {{ errorMessage() }}
                      </p>
                    }

                    <button
                      type="submit"
                      class="w-full bg-gray-900 text-white rounded-[4px] border-none p-[10px] text-[12px] tracking-[0.15em] uppercase cursor-pointer hover:bg-gray-700 transition-colors mt-2"
                    >
                      Entrar
                    </button>
                  </form>

                  <hr class="border-gray-200 my-[15px]" />
                  <a
                    routerLink="/register"
                    (click)="showLoginModal.set(false)"
                    class="block text-center text-[12px] text-gray-900 font-semibold hover:underline"
                    >Crear una cuenta nueva</a
                  >
                </div>
              }
            }
          </div>
        </div>

        <button
          class="relative w-[25px] h-[15px] cursor-pointer z-[60]"
          (click)="toggleMenu()"
          aria-label="Menú"
        >
          <span
            class="absolute top-0 left-0 w-full h-[1px] bg-black transition-transform duration-700 ease-in-out origin-center"
            [class.translate-y-[7px]]="isMenuOpen()"
            [class.rotate-45]="isMenuOpen()"
          ></span>
          <span
            class="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-700 ease-in-out origin-center"
            [class.-translate-y-[7px]]="isMenuOpen()"
            [class.-rotate-45]="isMenuOpen()"
          ></span>
        </button>
      </div>
    </header>

    <nav
      class="fixed top-0 right-0 h-screen w-full md:w-[277px] bg-[#f7f7f5] z-[40] transform transition-transform duration-700 ease-[cubic-bezier(0.39,0.575,0.565,1)] pt-[100px] px-10"
      [class.translate-y-0]="isMenuOpen()"
      [class.-translate-y-full]="!isMenuOpen()"
    >
      <ul class="flex flex-col gap-8 mt-4">
        @for (item of menuItems; track item.name; let i = $index) {
          <li class="overflow-hidden">
            <a
              [routerLink]="item.path"
              (click)="closeMenu()"
              class="block text-[14px] tracking-[0.15em] text-gray-900 uppercase opacity-0 hover:text-gray-500 transition-colors"
              [class.animate-slide-up]="isMenuOpen()"
              [style.animation-delay]="0.4 + i * 0.08 + 's'"
            >
              {{ item.name }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [
    `
      @keyframes slideUpFade {
        0% {
          opacity: 0;
          transform: translate3d(0, -16px, 0);
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
      .animate-slide-up {
        animation: slideUpFade 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) forwards;
      }
    `,
  ],
})
export class NavbarComponent {
  private router = inject(Router);
  authService = inject(AuthService);

  isMenuOpen = signal(false);
  isScrolled = signal(false);
  showLoginModal = signal(false);
  showProfileModal = signal(false);

  email = '';
  password = '';
  errorMessage = signal('');

  menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Habitaciones', path: '/rooms' },
    { name: 'Instalaciones', path: '/facilities' },
    { name: 'Cocina Kaiseki Horin', path: '/cuisine' },
    { name: 'Spa Entei', path: '/spa' },
    { name: 'Amenidades', path: '/amenities' },
    { name: 'Experiencias Únicas', path: '/experiences' },
  ];

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled.set(scrollOffset > 50);
  }

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.showLoginModal.set(false);
    this.showProfileModal.set(false);
  }

  toggleLoginModal(event: Event) {
    event.stopPropagation();
    this.showLoginModal.update((val) => !val);
    this.showProfileModal.set(false);
    this.errorMessage.set('');
  }

  toggleProfileModal(event: Event) {
    event.stopPropagation();
    this.showProfileModal.update((val) => !val);
    this.showLoginModal.set(false);
  }

  onLogin() {
    if (!this.email || !this.password) return;

    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.showLoginModal.set(false);
          this.email = '';
          this.password = '';
          if (res.role && res.role !== 'GUEST') {
            this.router.navigate(['/admin/dashboard']);
          }
        },
        error: (err: any) => {
          this.errorMessage.set(err.error || 'Credenciales incorrectas');
        },
      });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.showProfileModal.set(false);
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
