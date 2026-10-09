import { Routes } from '@angular/router';
import {authGuard, guestGuard, rolGuard} from './core/guards/auth.guard';
import { ROLES } from './shared/utils/roles.util';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión | EcoMercadito',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'crear-cuenta',
    title: 'Crear cuenta | EcoMercadito',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/crear-cuenta/crear-cuenta').then(m => m.CrearCuenta)
  },
  // Home para cualquier usuario autenticado
  {
    path: 'home',
    title: 'Inicio | EcoMercadito',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },

  /*
  // Área solo para Comercios
  {
    path: 'comercio',
    canActivate: [
      canActivate: [guestGuard],
      rolGuard(ROLES.COMERCIO, ROLES.ADMINISTRADOR)
    ],
    loadComponent: () => import('./features/comercio/dashboard').then(m => m.Dashboard)
  },

  // Área solo para Administradores
  {
    path: 'admin',
    canActivate: [
      canActivate: [guestGuard],
      rolGuard(ROLES.ADMINISTRADOR)
    ],,
    loadComponent: () => import('./features/admin/dashboard').then(m => m.Dashboard)
  },
  */
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
