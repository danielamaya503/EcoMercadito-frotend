import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ROLES, RolNombre } from '../utils/roles.util';
import {SesionService} from '../../core/services/sesion.service';

@Directive({
  selector: '[hasRol]'
})
export class HasRolDirective {
  hasRol = input.required<RolNombre | RolNombre[]>();

  private readonly sesion = inject(SesionService);
  private readonly view = inject(ViewContainerRef);
  private readonly tpl = inject(TemplateRef);

  constructor() {
    effect(() => {
      const rolOLista = this.hasRol();
      const lista = Array.isArray(rolOLista) ? rolOLista : [rolOLista];
      const visible = lista.some(r => this.sesion.tieneRol(r));
      visible ? this.view.createEmbeddedView(this.tpl) : this.view.clear();
    });
  }

  //  <!-- Mostrar solo a Administrador -->
  //<div *hasRol="ROLES.ADMINISTRADOR">
  //  Panel de administración
  //  </div>

  //  <!-- Mostrar a Comercio o Administrador -->
  //<div *hasRol="[ROLES.COMERCIO, ROLES.ADMINISTRADOR]">
  //  Botón de crear producto
  //  </div>
}
