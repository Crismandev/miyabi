import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { RoomType } from '../../models/room.model';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="rooms-page miyabi-container">
      <div class="page-header">
        <span class="badge-ryokan-luxury">CATÁLOGO DE ALOJAMIENTO</span>
        <h2>Nuestras Suites Ryokan & Villas Privadas</h2>
        <p>Espacios diseñados bajo principios de arquitectura orgánica Wabi-sabi y materiales nobles.</p>
      </div>

      <div class="rooms-grid">
        @for (type of roomTypes; track type.idTipoHabitacion) {
          <div class="room-card-large">
            <div class="room-info">
              <span class="badge-ryokan-luxury">{{ type.hasOnsen ? 'ONSEN PRIVADO TERMAL' : 'VISTA JARDÍN ZEN' }}</span>
              <h3>{{ type.nameType }}</h3>
              <p>{{ type.description }}</p>
              <div class="specs">
                <span>Capacidad: {{ type.capacityAdults }} Adultos, {{ type.capacityChildren }} Niños</span>
                <span>Vistas: {{ type.viewType }}</span>
              </div>
              <div class="price-bar">
                <span class="price">S/ {{ type.basePrice | number:'1.2-2' }} <small>/ noche</small></span>
                <a routerLink="/reservation" [queryParams]="{ typeId: type.idTipoHabitacion }" class="btn-primary-ryokan">RESERVAR SUITE</a>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .rooms-page {
      padding-top: 120px;
    }
    .page-header {
      text-align: center;
      margin-bottom: 50px;
    }
    .page-header h2 {
      font-size: 36px;
      margin-top: 10px;
    }
    .rooms-grid {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    .room-card-large {
      background: white;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      padding: 40px;
      box-shadow: var(--shadow-subtle);
    }
    .room-info h3 {
      font-size: 28px;
      margin: 15px 0 10px 0;
    }
    .specs {
      display: flex;
      gap: 30px;
      font-size: 13px;
      color: var(--color-ibushi);
      margin: 20px 0;
    }
    .price-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--color-border);
    }
    .price {
      font-size: 24px;
      font-weight: 600;
      color: var(--color-enji);
    }
  `]
})
export class RoomsComponent implements OnInit {
  private roomService = inject(RoomService);
  roomTypes: RoomType[] = [];

  ngOnInit() {
    this.roomService.getAllRoomTypes().subscribe({
      next: (types) => this.roomTypes = types,
      error: () => {
        this.roomTypes = [
          { idTipoHabitacion: 1, nameType: 'Suite Ryokan Sora', description: 'Habitación con futón de seda tradicional, suelo de tatami y Onsen privado.', basePrice: 450, capacityAdults: 2, capacityChildren: 1, hasOnsen: true, viewType: 'Jardín Zen' },
          { idTipoHabitacion: 2, nameType: 'Habitación Tatami Mizu', description: 'Suite amplia con bañera de madera Hinoki y vista al bosque de bambú.', basePrice: 320, capacityAdults: 2, capacityChildren: 2, hasOnsen: false, viewType: 'Bosque de Bambú' },
          { idTipoHabitacion: 3, nameType: 'Villa Imperial Yama', description: 'Villa privada de dos niveles con Onsen exterior, comedor Kaiseki y jardín privado.', basePrice: 780, capacityAdults: 4, capacityChildren: 2, hasOnsen: true, viewType: 'Montañas de Hakone' }
        ];
      }
    });
  }
}
