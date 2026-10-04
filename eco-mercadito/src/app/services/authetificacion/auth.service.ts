import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {ApiService} from '../api/api.service';
import {SesionService} from '../../core/services/sesion.service';

//orquesta el login y logout.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly sesion = inject(SesionService);
  private readonly router = inject(Router);

  //guardar la sesión.
  login(credenciales: any) {
    return this.api.post('Authentificacion/login', credenciales)
      .pipe(
      tap((data: any) => {
        if (data.success && data.data)
          this.sesion.iniciar(data.data);
      })
    );
  }

  // llama a SesionService.cerrar() y redirige a /login.
  logout(): void {
    this.sesion.cerrar();
    this.router.navigate(['/login']);
  }

  //Cómo lo usas:
  //this.auth.login(this.form.value).subscribe({ ... });
  //this.auth.logout();

}
