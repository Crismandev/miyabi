import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="location-page miyabi-container">
      <div class="page-intro">
        <span class="badge-ryokan-luxury">ACCESO & UBICACIÓN</span>
        <h2>Cómo Llegar a Hotel Miyabi Ryokan</h2>
        <p>Ubicado a solo 2 horas de Tokio vía Hokuriku Shinkansen y transferencia privada en la Estación Kaga-Onsen.</p>
      </div>
      <div class="location-details">
        <div class="route-info">
          <h3>Desde Estación de Tokio</h3>
          <p>Tome el JR Hokuriku Shinkansen hasta la Estación Kaga-Onsen (2h 15m). El servicio de shuttle privado del hotel le recogerá en la salida este.</p>
        </div>
        <div class="route-info">
          <h3>Desde Aeropuerto Komatsu (KMQ)</h3>
          <p>Servicio de taxi privado express disponible (25 minutos directo al Ryokan).</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .location-page { padding-top: 140px; padding-bottom: 100px; text-align: center; }
    .page-intro { max-width: 800px; margin: 0 auto 50px auto; }
    .location-details { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1000px; margin: 0 auto; text-align: left; }
    .route-info { background: white; border: 1px solid var(--color-border); padding: 35px; border-radius: 4px; }
    .route-info h3 { font-size: 20px; margin-bottom: 12px; }
    .route-info p { font-size: 14px; color: var(--color-ibushi); line-height: 1.6; }
  `]
})
export class LocationComponent {}
