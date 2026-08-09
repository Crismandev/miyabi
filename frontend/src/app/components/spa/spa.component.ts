import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spa',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spa-page miyabi-container">
      <div class="page-intro">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/spa_jp.svg" alt="Spa Entei" class="intro-jp">
        <h2>Spa Entei & Terapias Onsen</h2>
        <p>Tratamientos holísticos basados en hierbas medicinales de Yakushiyama y aguas termales sanadoras para renovar el cuerpo y el espíritu.</p>
      </div>
      <img src="https://mukayu.com/wp-content/themes/corporate/img/index/spa_img.jpg" alt="Spa Entei" class="main-img">
    </div>
  `,
  styles: [`
    .spa-page { padding-top: 140px; padding-bottom: 100px; text-align: center; }
    .page-intro { max-width: 800px; margin: 0 auto 40px auto; }
    .intro-jp { height: 30px; margin-bottom: 15px; }
    .main-img { width: 100%; max-width: 1100px; border-radius: 2px; }
  `]
})
export class SpaComponent {}
