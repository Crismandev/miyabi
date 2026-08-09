import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stay-offers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="stay-offers-page miyabi-container">
      <div class="page-intro">
        <span class="badge-ryokan-luxury">PAQUETES EXCLUSIVOS</span>
        <h2>Ofertas de Estancia & Paquetes Ryokan</h2>
        <p>Planes diseñados para inmersiones prolongadas de bienestar, gastronomía y desconexión total.</p>
      </div>
      <div class="offers-grid">
        <div class="offer-card">
          <h3>Retiro de Bienestar Onsen & Spa (3 Noches)</h3>
          <p>Incluye acceso ilimitado a baños privados Onsen, 2 sesiones de masaje herbal en Spa Entei y cena Kaiseki diaria.</p>
          <a routerLink="/reservation" class="btn-primary-ryokan">RESERVAR OFERTA</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stay-offers-page { padding-top: 140px; padding-bottom: 100px; text-align: center; }
    .page-intro { max-width: 800px; margin: 0 auto 40px auto; }
    .offers-grid { display: flex; justify-content: center; gap: 30px; margin-top: 40px; }
    .offer-card { background: white; border: 1px solid var(--color-border); padding: 40px; border-radius: 4px; max-width: 500px; text-align: left; }
    .offer-card h3 { font-size: 22px; margin-bottom: 15px; }
    .offer-card p { font-size: 14px; color: var(--color-ibushi); margin-bottom: 25px; }
  `]
})
export class StayOffersComponent {}
