import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private readonly messageService = inject(MessageService);

  exito(mensaje: string, titulo = 'Operación exitosa'): void {
    this.messageService.add({
      severity: 'success',
      summary: titulo,
      detail: mensaje,
      life: 3500
    });
  }

  error(mensaje: string, titulo = 'Ocurrió un error'): void {
    this.messageService.add({
      severity: 'error',
      summary: titulo,
      detail: mensaje,
      life: 5000
    });
  }

  advertencia(mensaje: string, titulo = 'Atención'): void {
    this.messageService.add({
      severity: 'warn',
      summary: titulo,
      detail: mensaje,
      life: 4000
    });
  }

  informacion(mensaje: string, titulo = 'Información'): void {
    this.messageService.add({
      severity: 'info',
      summary: titulo,
      detail: mensaje,
      life: 3500
    });
  }
}
