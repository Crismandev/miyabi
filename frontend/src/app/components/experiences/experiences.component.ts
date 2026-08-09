import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="experiences-page miyabi-container">
      <div class="page-intro">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/experience_jp.svg" alt="Experiencias" class="intro-jp">
        <h2>Experiencias Privadas Únicas</h2>
        <p>Ceremonia del té matutina conducida por los propietarios del Ryokan, meditación Zazen privada e itinerarios culturales a medida.</p>
      </div>
      <img src="https://mukayu.com/wp-content/themes/corporate/img/index/experience_img.jpg" alt="Experiencias" class="main-img">
    </div>
  `,
  styles: [`
    .experiences-page { padding-top: 140px; padding-bottom: 100px; text-align: center; }
    .page-intro { max-width: 800px; margin: 0 auto 40px auto; }
    .intro-jp { height: 30px; margin-bottom: 15px; }
    .main-img { width: 100%; max-width: 1100px; border-radius: 2px; }
  `]
})
export class ExperiencesComponent {}
