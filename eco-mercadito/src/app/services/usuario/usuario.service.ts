import {inject, Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';
import {HttpContext} from '@angular/common/http';
import {OMITIR_USUARIO_ID} from '../../core/http/http-context.tokens';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(ApiService);

  todoUsuarios(pageNumber: number, pageSize: number ): Observable<any>{
    return this.http.get("Usuarios" , {
        page: pageNumber,
        pageSize: pageSize
    })
  }

  usuarioId(id: number): Observable<any>{
    return this.http.get(`Usuarios/${id}`)
  }

  crear(usuario: any): Observable<any>{
    const context = new HttpContext()
      .set(OMITIR_USUARIO_ID, true);

    return this.http.post('Usuarios', usuario, {context});
  }

  actualizar(usuario: any, id: number): Observable<any> {
    return this.http.put(`Usuarios/${id}`, usuario);
  }

  desactivar(id: number): Observable<any>{
    return this.http.delete(`Usuarios/${id}`);
  }

}
