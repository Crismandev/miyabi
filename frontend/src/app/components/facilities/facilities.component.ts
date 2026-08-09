import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="facilities-page miyabi-container">
      <div class="page-intro">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/facilities_jp.svg" alt="Instalaciones" class="intro-jp">
        <h2>Instalaciones & Espacios de Sanación</h2>
        <p>
          MIYABI se sitúa en la ladera de Yakushiyama, la montaña sagrada del Buda de la Curación. Ofrecemos bibliotecas para la lectura, baños termales Onsen y el Spa Entei con tratamientos botánicos medicinales de la región.
        </p>
      </div>

      <div class="facility-section">
        <div class="facility-text">
          <h3>Entrada & Jardín del Bosque</h3>
          <p>
            El ryokan se erige al final de una estrecha pendiente rodeada de verdor. El sol filtrándose entre los árboles y la suave brisa crean un juego de luces sobre el suelo de tierra de diatomeas local. El sagrado pino rojo Akamatsu de 300 años es el emblema del bosque.
          </p>
        </div>
        <div class="facility-gallery">
          <img src="https://mukayu.com/wp-content/themes/corporate/img/facilities/lob_img_01.jpg" alt="Entrada" class="gallery-img">
          <img src="https://mukayu.com/wp-content/themes/corporate/img/facilities/gar_img_01.jpg" alt="Jardín" class="gallery-img">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .facilities-page {
      padding-top: 140px;
      padding-bottom: 100px;
    }
    .page-intro {
      max-width: 800px;
      margin: 0 auto 60px auto;
      text-align: center;
    }
    .intro-jp {
      height: 30px;
      margin-bottom: 15px;
    }
    .page-intro h2 {
      font-size: 36px;
      margin-bottom: 15px;
    }
    .page-intro p {
      font-size: 15px;
      line-height: 1.8;
      color: var(--color-ibushi);
    }
    .facility-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      margin-top: 60px;
      align-items: center;
    }
    .facility-text h3 {
      font-size: 26px;
      margin-bottom: 15px;
    }
    .facility-gallery {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .gallery-img {
      width: 100%;
      border-radius: 2px;
    }
  `]
})
export class FacilitiesComponent {}
