import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {SesionService} from '../services/sesion.service';

// protege rutas para que solo entren usuarios autenticados (y opcionalmente con cierto rol).

//permite entrar solo si sesion.autenticado() es true. Si no, redirige a /login.
export const authGuard: CanActivateFn = () => {
  const sesion = inject(SesionService);
  const router = inject(Router);

  return sesion.autenticado()
    ? true
    : router.createUrlTree(['/login']);
};

//permite entrar solo si el usuario tiene alguno de esos roles.
export const rolGuard = (...roles: string[]): CanActivateFn => () => {
  const sesion = inject(SesionService);
  const router = inject(Router);

  return sesion.tieneRol(...roles)
    ? true
    : router.createUrlTree(['/home']);
};

export const guestGuard: CanActivateFn = () => {
  const sesion = inject(SesionService);
  const router = inject(Router);

  return sesion.autenticado()
    ? router.createUrlTree(['/home'])
    : true;
};

//Cómo los usas:
//{
//  path: 'productos',
//    canActivate: [authGuard],
//  loadComponent: () => import('./features/productos/listado').then(m => m.Listado)
//},
//{
//  path: 'admin',
//   canActivate: [rolGuard('Admin')],
//  loadComponent: () => import('./features/admin/dashboard').then(m => m.Dashboard)
//}
