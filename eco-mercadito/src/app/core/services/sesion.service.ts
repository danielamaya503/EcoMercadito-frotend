import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {CookieService} from './cookie.service';

//maneja toda la lógica de sesión del usuario.
@Injectable({ providedIn: 'root' })
export class SesionService {
  private readonly cookies = inject(CookieService);
  private readonly clave = environment.cookieSesion;

  //el objeto completo que devuelve el login (AuthResponse).
  readonly usuario = signal<any>(this.leerCookie());
  readonly autenticado = computed(() => !!this.usuario());
  readonly usuarioId = computed(() => this.usuario()?.usuarioId ?? null);
  readonly nombreRol = computed(() => this.usuario()?.nombreRol ?? '');

  //se llama después de un login exitoso. Guarda la cookie y actualiza el signal usuario.
  iniciar(authResponse: any): void {
    this.cookies.set(this.clave, JSON.stringify(authResponse), new Date(authResponse.expiracion));
    this.usuario.set(authResponse);
  }

  //se llama al hacer logout. Borra la cookie y pone usuario en null
  cerrar(): void {
    this.cookies.delete(this.clave);
    this.usuario.set(null);
  }

  // devuelve true si el usuario tiene alguno de esos roles.
  tieneRol(...roles: string[]): boolean {
    return roles.includes(this.nombreRol());
  }

  //En cualquier parte donde necesites saber “¿quién está logueado?”:
    //private readonly sesion = inject(SesionService);
    //const id = this.sesion.usuarioId();
    //const esAdmin = this.sesion.tieneRol('Admin');
  //En el interceptor se usa para obtener usuarioId y agregarlo a cada petición.

  private leerCookie(): any {
    const raw = this.cookies.get(this.clave);

    if (!raw) {
      return null;
    }

    try {
      const sesion = JSON.parse(raw);

      if (
        sesion.expiracion &&
        new Date(sesion.expiracion) <= new Date()
      ) {
        this.cookies.delete(this.clave);
        return null;
      }

      return sesion;
    } catch {
      this.cookies.delete(this.clave);
      return null;
    }
  }
}
