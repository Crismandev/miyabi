import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let session = authService.currentUser();
  if (!session.isLoggedIn) {
    session = authService.getInitialSession();
  }

  if (session.isLoggedIn) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let session = authService.currentUser();
  if (!session.isLoggedIn) {
    session = authService.getInitialSession();
  }

  // Permitir solo a personal (Administrator, Receptionist, Cuartelero, STAFF, etc.) - NUNCA a clientes (GUEST)
  if (session.isLoggedIn && session.role && session.role !== 'GUEST') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const strictAdminOnlyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let session = authService.currentUser();
  if (!session.isLoggedIn) {
    session = authService.getInitialSession();
  }

  // Exclusivo para el rol Administrador
  const roleName = session.role ? session.role.toUpperCase() : '';
  if (session.isLoggedIn && (roleName === 'ADMINISTRATOR' || roleName === 'ADMIN')) {
    return true;
  }

  // Si es recepcionista u otro personal intenta entrar a /admin/users o /admin/reports, redirigir al Dashboard
  if (session.isLoggedIn && session.role !== 'GUEST') {
    router.navigate(['/admin/dashboard']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};

