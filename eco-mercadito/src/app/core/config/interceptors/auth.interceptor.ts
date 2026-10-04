import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {SesionService} from '../../services/sesion.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sesion = inject(SesionService);
  const usuarioId = sesion.usuarioId();

  const esPeticionApi = req.url.startsWith(environment.apiUrl);
  const esLogin = req.url.endsWith('/Authentificacion/login');

  if (usuarioId == null || !esPeticionApi || esLogin) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-Usuario-Id': String(usuarioId)
      }
    })
  );
};
