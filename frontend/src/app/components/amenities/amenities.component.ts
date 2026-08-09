import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="amenities-page miyabi-container">
      <div class="page-intro">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/amenity_jp.svg" alt="Amenidades" class="intro-jp">
        <h2>Amenidades de Yakushiyama</h2>
        <p>Cosmética botánica formulada exclusivamente con extractos de hierbas medicinales de nuestra ladera sagrada.</p>
      </div>
      <img src="https://mukayu.com/wp-content/themes/corporate/img/index/amenity_img.jpg" alt="Amenidades" class="main-img">
    </div>
  `,
  styles: [`
    .amenities-page { padding-top: 140px; padding-bottom: 100px; text-align: center; }
    .page-intro { max-width: 800px; margin: 0 auto 40px auto; }
    .intro-jp { height: 30px; margin-bottom: 15px; }
    .main-img { width: 100%; max-width: 1100px; border-radius: 2px; }
  `]
})
export class AmenitiesComponent {}
