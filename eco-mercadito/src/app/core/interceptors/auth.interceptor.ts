import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {SesionService} from '../services/sesion.service';
import {OMITIR_USUARIO_ID} from '../http/http-context.tokens';

//intercepta todas las peticiones HTTP y les agrega automáticamente el usuarioId como parámetro de query (?usuarioId=1).
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(OMITIR_USUARIO_ID)) {
    return next(req);
  }

  const sesion = inject(SesionService);
  const usuarioId = sesion.usuarioId();

  if (usuarioId == null) return next(req);

  const peticion = req.clone({
    setParams: { usuarioId: String(usuarioId) }
  });

  return next(peticion);

  //Cómo lo usas:
  //No lo llamas directamente. Ya está registrado en app.config.ts:
    //provideHttpClient(withInterceptors([authInterceptor]))
  //En tus servicios solo haces:
    //this.api.get('productos');
};
