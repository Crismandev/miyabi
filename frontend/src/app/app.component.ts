import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    @if (!isAdminRoute) {
      <app-navbar></app-navbar>
    }

    <div class="main-content">
      <router-outlet></router-outlet>
    </div>

    @if (!isAdminRoute) {
      <app-footer></app-footer>
    }
  `,
  styles: [
    `
      .main-content {
        min-height: 80vh;
      }
    `,
  ],
})
export class AppComponent {
  private router = inject(Router);
  isAdminRoute = false;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isAdminRoute = event.urlAfterRedirects.includes('/admin');
      });
  }
}
