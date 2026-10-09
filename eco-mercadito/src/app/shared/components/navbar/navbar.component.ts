import {Component, inject, input, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {DrawerModule} from 'primeng/drawer';
import {TagModule} from 'primeng/tag';
import {SesionService} from '../../../core/services/sesion.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AvatarModule,
    ButtonModule,
    DrawerModule,
    TagModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router = inject(Router);

  readonly sesion = inject(SesionService);

  readonly mostrarEstadoRed = input(true);
  readonly mostrarLogout = input(true);
  readonly mostrarTextoLogout = input(true);
  readonly mostrarBusqueda = input(false);

  appName = environment.appName;
  appCity = environment.city;

  //Colocar opciones
  readonly enlaces = input<any[]>([
    {
      label: 'Descubrir',
      ruta: '/home',
      icono: 'pi pi-compass'
    },
    {
      label: 'Mis Ofertas / Pedidos',
      ruta: '/mis-ofertas-pedidos',
      icono: 'pi pi-shopping-bag'
    },
    {
      label: 'Publicar',
      ruta: '/publicar',
      icono: 'pi pi-plus-circle',
      roles: ['Comercio', 'Administrador']
    },
    {
      label: 'Impacto Ecológico',
      ruta: '/impacto-ecologico',
      icono: 'pi pi-globe'
    }
  ]);

  readonly menuVisible = signal(false);

  abrirMenu(): void {
    this.menuVisible.set(true);
  }

  cerrarMenu(): void {
    this.menuVisible.set(false);
  }

  cerrarSesion(): void {
    this.sesion.cerrar();
    this.menuVisible.set(false);
    this.router.navigate(['/login']);
  }

  navegar(ruta: string): void {
    this.menuVisible.set(false);
    this.router.navigate([ruta]);
  }

  enlaceVisible(enlace: any): boolean {
    if (!enlace.roles?.length) {
      return true;
    }

    return enlace.roles.includes(this.sesion.nombreRol());
  }
}
