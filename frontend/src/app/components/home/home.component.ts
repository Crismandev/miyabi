import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- ── SECCIÓN HERO (PORTADA PRINCIPAL MINIMALISTA RYOKAN) ──────────── -->
    <section class="hero-section">
      <!-- Imagen de Fondo Hero Original -->
      <div class="hero-bg"></div>

      <!-- Logotipos de certificación de lujo (Relais & Châteaux, Michelin) -->
      <div class="hero-top-left fade-in-element delay-3">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/index/logoRC-w.svg" alt="Relais & Châteaux" class="top-logo">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/index/logoMichelin2025-w.svg" alt="Michelin Guide" class="top-logo">
      </div>

      <!-- Identidad visual central del Ryokan -->
      <div class="hero-center-wrapper">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/index/hero_logo.svg" alt="Miyabi Central" class="center-main-img fade-in-element delay-1">
        <img src="https://mukayu.com/wp-content/themes/corporate/img/index/hero_jp.svg" alt="Miyabi Texto" class="center-sub-img fade-in-element delay-2">
      </div>

      <!-- Flecha de Scroll Minimalista -->
      <div class="hero-arrow-container">
        <div class="fade-in-element delay-4">
          <svg class="floating-arrow" width="65" height="65" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="5 9 12 16 19 9" stroke="white" stroke-width="0.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </section>

    <!-- ── SECCIÓN INTRO (FILOSOFÍA RYOKAN & CONCEPTO MIYABI) ────────────── -->
    <section class="intro-section miyabi-container">
      <div class="intro-container">
        <div class="intro-left">
          <img src="https://mukayu.com/wp-content/themes/corporate/img/index/concept_en.svg" alt="Beniya Mukayu - Richness in emptiness" class="intro-title-img">
          <div class="intro-text">
            <p>
              La verdadera belleza florece en la discreción y el refinamiento; estos son los principios de MIYABI, un concepto que ha definido la estética japonesa durante más de mil años. Sus raíces sugieren que el alma alcanza su máximo esplendor al rodearse de armonía y gracia sutil, habitando un espacio donde cada detalle tiene un sentido profundo. MIYABI significa 'elegancia refinada' o 'sofisticación del espíritu', representando un ideal donde los valores cotidianos se elevan hacia lo sublime.
            </p>
          </div>
          <p class="intro-author">Kiyoshi Sey Takeyama | Arquitecto</p>
          <a href="https://www.youtube.com/watch?v=NZ84oLS6_Uw&t=1s" target="_blank" class="play-movie-btn">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/index/move_btn_en.svg" alt="Play Movie">
          </a>
        </div>
        <div class="intro-right">
          <img src="https://mukayu.com/wp-content/themes/corporate/img/index/concept_img.jpg" alt="Minimalist Plant" class="intro-main-img">
        </div>
      </div>
    </section>

    <!-- ── SECCIÓN FEATURES (BLOQUES VERTICALES DE SERVICIOS) ───────────── -->
    <section class="features-section miyabi-container">
      <!-- Bloque 1: Habitaciones -->
      <div class="feature-block">
        <div class="feature-left">
          <a routerLink="/rooms" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/rooms_jp.svg" alt="Habitaciones" class="feature-jp-img">
            <h3 class="feature-title rooms">Habitaciones</h3>
          </a>
        </div>
        <div class="feature-right">
          <a routerLink="/rooms" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/index/rooms_img.jpg" alt="Vista de la habitación" class="feature-main-img">
          </a>
        </div>
      </div>

      <!-- Bloque 2: Instalaciones -->
      <div class="feature-block">
        <div class="feature-left">
          <a routerLink="/facilities" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/facilities_jp.svg" alt="Instalaciones" class="feature-jp-img">
            <h3 class="feature-title facilities">Instalaciones</h3>
          </a>
        </div>
        <div class="feature-right">
          <a routerLink="/facilities" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/index/facilities_img.jpg" alt="Instalaciones" class="feature-main-img">
          </a>
        </div>
      </div>

      <!-- Bloque 3: Cocina Kaiseki Horin -->
      <div class="feature-block">
        <div class="feature-left">
          <a routerLink="/cuisine" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/cuisine_jp.svg" alt="Cocina Kaiseki" class="feature-jp-img">
            <h3 class="feature-title cuisine">Cocina Kaiseki Horin</h3>
          </a>
        </div>
        <div class="feature-right">
          <a routerLink="/cuisine" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/index/cuisine_img.jpg" alt="Gastronomía Kaiseki" class="feature-main-img">
          </a>
        </div>
      </div>

      <!-- Bloque 4: Spa Entei -->
      <div class="feature-block">
        <div class="feature-left">
          <a routerLink="/spa" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/spa_jp.svg" alt="Spa Entei" class="feature-jp-img">
            <h3 class="feature-title spa">Spa Entei</h3>
          </a>
        </div>
        <div class="feature-right">
          <a routerLink="/spa" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/index/spa_img.jpg" alt="Spa Entei" class="feature-main-img">
          </a>
        </div>
      </div>

      <!-- Bloque 5: Amenidades de Yakushiyama -->
      <div class="feature-block">
        <div class="feature-left">
          <a routerLink="/amenities" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/amenity_jp.svg" alt="Amenidades" class="feature-jp-img">
            <h3 class="feature-title amenities">Amenidades de Yakushiyama</h3>
          </a>
        </div>
        <div class="feature-right">
          <a routerLink="/amenities" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/index/amenity_img.jpg" alt="Amenidades" class="feature-main-img">
          </a>
        </div>
      </div>

      <!-- Bloque 6: Experiencias Privadas Únicas -->
      <div class="feature-block">
        <div class="feature-left">
          <a routerLink="/experiences" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/experience_jp.svg" alt="Experiencias" class="feature-jp-img">
            <h3 class="feature-title experiences">Experiencias Privadas Únicas</h3>
          </a>
        </div>
        <div class="feature-right">
          <a routerLink="/experiences" class="feature-link-wrapper">
            <img src="https://mukayu.com/wp-content/themes/corporate/img/index/experience_img.jpg" alt="Experiencias" class="feature-main-img">
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      background-color: #000;
    }
    .hero-bg {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: url('https://mukayu.com/wp-content/themes/corporate/img/index/hero_img.jpg');
      background-size: cover;
      background-position: center;
      z-index: 1;
    }
    .hero-top-left {
      position: absolute;
      top: 30px;
      left: 30px;
      display: flex;
      align-items: center;
      gap: 20px;
      z-index: 10;
    }
    .top-logo {
      height: 55px;
      width: auto;
    }
    .hero-center-wrapper {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    .center-main-img {
      display: block;
      width: 450px;
      height: auto;
    }
    .center-sub-img {
      position: absolute;
      bottom: -120px;
      right: -120px;
      width: 150px;
      height: auto;
    }
    .hero-arrow-container {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
    .floating-arrow {
      animation: flotar 2s ease-in-out infinite;
    }
    .fade-in-element {
      opacity: 0;
      animation: aparecer 1.5s ease-out forwards;
    }
    .delay-1 { animation-delay: 0.5s; }
    .delay-2 { animation-delay: 1.0s; }
    .delay-3 { animation-delay: 1.5s; }
    .delay-4 { animation-delay: 2.0s; }
    @keyframes aparecer {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes flotar {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(15px); }
    }
    .intro-section {
      padding-top: 100px;
      padding-bottom: 100px;
    }
    .intro-container {
      display: flex;
      justify-content: space-between;
      gap: 60px;
    }
    .intro-left {
      width: 40%;
      display: flex;
      flex-direction: column;
      gap: 25px;
    }
    .intro-title-img {
      max-width: 100%;
      height: auto;
    }
    .intro-text p {
      font-size: 15px;
      line-height: 1.8;
      color: var(--color-sumi);
    }
    .intro-author {
      font-size: 13px;
      color: var(--color-ibushi);
    }
    .play-movie-btn img {
      height: 32px;
    }
    .intro-right {
      width: 55%;
    }
    .intro-main-img {
      width: 100%;
      height: auto;
      border-radius: 2px;
    }
    .features-section {
      display: flex;
      flex-direction: column;
      gap: 100px;
      padding-top: 100px;
      padding-bottom: 100px;
    }
    .feature-block {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 80px;
    }
    .feature-left {
      width: 25%;
      padding: 40px 0;
    }
    .feature-link-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
      text-decoration: none;
      color: inherit;
    }
    .feature-jp-img {
      width: 20px;
      height: auto;
    }
    .feature-title {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 2px;
      color: var(--color-sumi);
      line-height: 1.3;
    }
    .feature-right {
      width: calc(75% - 80px);
    }
    .feature-main-img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.6s ease;
    }
    .feature-main-img:hover {
      transform: scale(1.01);
    }
    @media (max-width: 900px) {
      .intro-container { flex-direction: column; }
      .intro-left, .intro-right { width: 100%; }
      .feature-block { flex-direction: column-reverse; gap: 30px; }
      .feature-left, .feature-right { width: 100%; }
    }
  `]
})
export class HomeComponent {}
