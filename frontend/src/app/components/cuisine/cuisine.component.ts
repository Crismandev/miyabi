import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuisine',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cuisine-page miyabi-container">
      <div class="page-intro">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/cuisine_jp.svg" alt="Cocina Kaiseki" class="intro-jp">
        <h2>Cocina Kaiseki Horin</h2>
        <p>Gastronomía estacional elaborada con ingredientes locales de Ishikawa y el Mar de Japón. Cada plato refleja la riqueza y serenidad de las cuatro estaciones.</p>
      </div>
      <div class="cuisine-content">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/index/cuisine_img.jpg" alt="Kaiseki Dining" class="main-img">
      </div>
    </div>
  `,
  styles: [`
    .cuisine-page { padding-top: 140px; padding-bottom: 100px; text-align: center; }
    .page-intro { max-width: 800px; margin: 0 auto 40px auto; }
    .intro-jp { height: 30px; margin-bottom: 15px; }
    .main-img { width: 100%; max-width: 1100px; border-radius: 2px; }
  `]
})
export class CuisineComponent {}
