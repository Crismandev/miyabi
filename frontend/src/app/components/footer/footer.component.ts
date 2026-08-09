import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="miyabi-footer">
      <div class="footer-content">
        <div class="footer-col left-col">
          <img src="img/logo.png" alt="Hotel Miyabi" class="footer-logo" />
          <p class="hotel-name">HOTEL MIYABI (雅) · KYOTO RYOKAN</p>
          <p>Kanagawa-ken, Ashigarashimo-gun, Hakone, Yumoto 699</p>
          <a href="https://maps.google.com" target="_blank" class="map-link">Ver Ubicación en Mapa ➔</a>
          <p class="phone">+81 75-555-0192</p>
        </div>

        <div class="footer-col center-col">
          <p class="award-title">RECONOCIMIENTOS</p>
          <ul class="award-list">
            <li>★ GUÍA MICHELIN - 3 LLAVES RYOKAN</li>
            <li>★ RELAIS & CHÂTEAUX MEMBER</li>
            <li>★ JAPAN OMOTENASHI PRIZE 2025</li>
          </ul>
          <div class="award-logos">
            <span class="badge-ryokan-luxury">LUXURY RYOKAN</span>
          </div>
          <p class="copyright">© 2026 HOTEL MIYABI. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>

        <div class="footer-col right-col">
          <ul class="footer-links">
            <li><a routerLink="/rooms">HABITACIONES <span>➔</span></a></li>
            <li><a routerLink="/facilities">INSTALACIONES & ONSEN <span>➔</span></a></li>
            <li><a routerLink="/reservation">RESERVAR ESTANCIA <span>➔</span></a></li>
            <li><a routerLink="/my-reservations">MIS RESERVAS <span>➔</span></a></li>
          </ul>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .miyabi-footer {
      border-top: 1px solid #000000;
      margin: 80px 8% 0 8%;
      padding: 60px 0 80px 0;
      color: var(--color-sumi);
      font-size: 13px;
    }
    .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 40px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .footer-col {
      flex: 1 1 280px;
    }
    .footer-logo {
      height: 48px;
      width: auto;
      margin-bottom: 15px;
    }
    .hotel-name {
      font-weight: 600;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .map-link {
      color: var(--color-sumi);
      text-decoration: none;
      border-bottom: 1px solid var(--color-sumi);
      display: inline-block;
      margin: 10px 0;
      font-size: 12px;
    }
    .phone {
      font-size: 22px;
      font-family: var(--font-serif);
      margin-top: 10px;
    }
    .award-title {
      font-weight: 600;
      letter-spacing: 2px;
      margin-bottom: 12px;
      font-size: 12px;
    }
    .award-list {
      list-style: none;
      margin-bottom: 20px;
    }
    .award-list li {
      font-size: 11px;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .copyright {
      margin-top: 30px;
      font-size: 10px;
      letter-spacing: 1.5px;
      color: var(--color-ibushi);
    }
    .footer-links {
      list-style: none;
      border-top: 1px solid #000000;
    }
    .footer-links li {
      border-bottom: 1px solid #000000;
    }
    .footer-links a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      color: var(--color-sumi);
      padding: 14px 0;
      font-size: 12px;
      letter-spacing: 1.5px;
      font-weight: 500;
    }
  `]
})
export class FooterComponent {}
