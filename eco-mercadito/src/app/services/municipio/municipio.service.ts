import {inject, Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private readonly http = inject(ApiService)

  obtenerTodos(pageNumber: number, pageSize: number) {
    return this.http.get('Municipios', {
      pageNumber,
      pageSize
    });
  }

  obtenerId(id: number) {
    return this.http.get(`Municipios/${id}`)
  }

  obtenerPorDepartamento(id: number) {
    return this.http.get(`Municipios/departamento/${id}`)
  }

  obtenerPorNombre(nombre: string, pageNumber: number, pageSize: number) {
    return this.http.get(`Municipios/buscar`, {
      nombre,
      pageNumber,
      pageSize
    })
  }
}
