import { Injectable } from '@angular/core';

//Lo usa SesionService para guardar y leer la sesión
@Injectable({ providedIn: 'root' })
export class CookieService
{
  //guarda una cookie con fecha de expiración opcional.
  set(nombre: string, valor: string, expira?: Date): void {
    const fecha = expira ? `; expires=${expira.toUTCString()}` : '';
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${nombre}=${encodeURIComponent(valor)}${fecha}; path=/; SameSite=Strict${secure}`;
  }
  //lee una cookie por nombre
  get(nombre: string): string | null {
    const par = document.cookie.split('; ').find(c => c.startsWith(`${nombre}=`));
    return par ? decodeURIComponent(par.substring(nombre.length + 1)) : null;
  }
  //elimina una cookie
  delete(nombre: string): void {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict`;
  }
}
