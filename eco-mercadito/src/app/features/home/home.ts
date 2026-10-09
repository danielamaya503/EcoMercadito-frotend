import {Component, computed, inject, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DrawerModule} from 'primeng/drawer';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {SelectModule} from 'primeng/select';
import {TagModule} from 'primeng/tag';
import { SesionService } from '../../core/services/sesion.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.development';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    CurrencyPipe,
    FormsModule,
    AvatarModule,
    ButtonModule,
    CardModule,
    DrawerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ProgressBarModule,
    SelectModule,
    TagModule,
    NavbarComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly router = inject(Router);
  readonly sesion = inject(SesionService);

  menuMovil = false;

  appCity = environment.city;
  appName = environment.appName;
  ahora = environment.ahora;

  readonly textoBusqueda = signal('');
  readonly municipioSeleccionado = signal<string | null>(null);
  readonly categoriaActiva = signal('todas');
  readonly filtrosRapidos = signal<string[]>(['hoy']);

  readonly menu = [
    { label: 'Descubrir', icono: 'pi pi-compass', activo: true },
    { label: 'Mis Ofertas / Pedidos', icono: 'pi pi-shopping-bag', activo: false },
    { label: 'Publicar', icono: 'pi pi-plus-circle', activo: false },
    { label: 'Impacto Ecológico', icono: 'pi pi-globe', activo: false }
  ];

  readonly municipios = [
    { label: 'Todos los municipios salvadoreños', value: null },
    { label: 'San Salvador Centro', value: 'San Salvador Centro' },
    { label: 'Santa Tecla', value: 'Santa Tecla' },
    { label: 'Antiguo Cuscatlán', value: 'Antiguo Cuscatlán' },
    { label: 'Santa Ana', value: 'Santa Ana' },
    { label: 'San Miguel', value: 'San Miguel' }
  ];

  readonly filtros = [
    { clave: 'cerca', label: '< 3 km', icono: 'pi pi-map-marker' },
    { clave: 'hoy', label: 'Recogida hoy', icono: 'pi pi-clock' },
    { clave: 'descuento', label: 'Mayor descuento', icono: 'pi pi-percentage' },
    { clave: 'vegetariano', label: 'Vegetariano', icono: 'pi pi-leaf' }
  ];

  readonly categorias = [
    { clave: 'todas', label: 'Todas', icono: 'pi pi-th-large' },
    { clave: 'frutas', label: 'Frutas y Verduras', icono: 'pi pi-apple' },
    { clave: 'panaderia', label: 'Panadería y Dulces', icono: 'pi pi-star' },
    { clave: 'preparada', label: 'Comida Preparada', icono: 'pi pi-clock' },
    { clave: 'lacteos', label: 'Lácteos y Quesos', icono: 'pi pi-box' },
    { clave: 'cafeteria', label: 'Cafetería y Repostería', icono: 'pi pi-heart' },
    { clave: 'super', label: 'Supermercados y Abarrotes', icono: 'pi pi-shopping-cart' }
  ];

  readonly ofertas = signal<any[]>([
    {
      id: 1, categoria: 'frutas', comercio: 'Mercadito Central', municipio: 'San Salvador Centro',
      titulo: 'Cesta de Tomates y Verduras Frescas',
      descripcion: 'Selección de hortalizas cosechadas localmente listas para consumo directo, salsas o guisos caseros.',
      precio: 0.75, precioOriginal: 2.0, descuento: 60, disponibles: 3, co2: 0.5,
      tiempo: 'Quedan 2h (5:00 PM - 7:00 PM)', urgente: false, cerca: true, vegetariano: true, hoy: true,
      icono: 'pi pi-apple', tono: 'primary',
      etiquetas: [{ texto: 'Vegetariano', severidad: 'success' }]
    },
    {
      id: 2, categoria: 'panaderia', comercio: 'Panadería La Espiga', municipio: 'Santa Tecla',
      titulo: 'Surtido de Panes Dulces Típicos y Semita',
      descripcion: 'Horneado matutino en perfecto estado. Incluye semita alta de dulce de panela y piezas de café.',
      precio: 2.5, precioOriginal: 5.0, descuento: 50, disponibles: 1, co2: 1.2,
      tiempo: 'Quedan 45m', urgente: true, cerca: true, vegetariano: true, hoy: true,
      icono: 'pi pi-star', tono: 'warning',
      etiquetas: [{ texto: '¡Último lote!', severidad: 'danger' }]
    },
    {
      id: 3, categoria: 'preparada', comercio: 'El Rincón Salvadoreño', municipio: 'Antiguo Cuscatlán',
      titulo: 'Menú del Día y Pupusas Tradicionales',
      descripcion: 'Paquete de almuerzo tardío con 4 pupusas surtidas y acompañamiento caliente elaborado al momento.',
      precio: 4.5, precioOriginal: 7.5, descuento: 40, disponibles: 5, co2: 2.1,
      tiempo: 'Queda 1h', urgente: false, cerca: false, vegetariano: false, hoy: true,
      icono: 'pi pi-clock', tono: 'primary',
      etiquetas: [{ texto: 'Listo para comer', severidad: 'success' }]
    },
    {
      id: 4, categoria: 'lacteos', comercio: 'Lácteos San Julián', municipio: 'San Salvador Centro',
      titulo: 'Combo de Lácteos Artesanales y Cuajada',
      descripcion: 'Productos frescos de granja salvadoreña refrigerados óptimamente con fecha de consumo preferente próxima.',
      precio: 3.2, precioOriginal: 7.0, descuento: 55, disponibles: 4, co2: 1.8,
      tiempo: 'Quedan 3h', urgente: false, cerca: true, vegetariano: true, hoy: true,
      icono: 'pi pi-box', tono: 'neutral',
      etiquetas: []
    },
    {
      id: 5, categoria: 'cafeteria', comercio: 'Café & Bistro La Fleur', municipio: 'San Salvador Centro',
      titulo: 'Pastelería y Repostería Francesa',
      descripcion: 'Croissants de almendra, eclairs y porciones de pastel artesanal gourmet del día elaborados por chefs pasteleros.',
      precio: 3.75, precioOriginal: 10.0, descuento: 65, disponibles: 2, co2: 1.4,
      tiempo: 'Quedan 1h 15m', urgente: false, cerca: false, vegetariano: true, hoy: true,
      icono: 'pi pi-heart', tono: 'warning',
      etiquetas: []
    },
    {
      id: 6, categoria: 'super', comercio: 'Frutería Don Chepe', municipio: 'Antiguo Cuscatlán',
      titulo: 'Pack Sorpresa Frutas de Temporada',
      descripcion: 'Ideal para jugos o licuados nutritivos. Fruta dulce en su punto óptimo de maduración sin golpes mayores.',
      precio: 1.5, precioOriginal: 3.0, descuento: 50, disponibles: 6, co2: 0.8,
      tiempo: 'Quedan 2h 30m', urgente: false, cerca: false, vegetariano: true, hoy: true,
      icono: 'pi pi-shopping-cart', tono: 'primary',
      etiquetas: [{ texto: 'Fruta madura', severidad: 'success' }]
    }
  ]);

  readonly impacto = {
    actualizado: 'Actualizado hace 4 min',
    alimentosKg: 1420,
    emisionesTon: 3.8,
    metaTon: 5.0,
    ahorroFamiliar: 4150,
    ahorroPromedio: 6.5
  };

  readonly progresoMeta = Math.round((this.impacto.emisionesTon / this.impacto.metaTon) * 100);

  readonly conteoCategorias = computed(() => {
    const ofertas = this.ofertas();
    const conteo: any = { todas: ofertas.length };

    ofertas.forEach((oferta: any) => {
      conteo[oferta.categoria] = (conteo[oferta.categoria] ?? 0) + 1;
    });

    return conteo;
  });

  readonly ofertasFiltradas = computed(() => {
    const texto = this.textoBusqueda().trim().toLowerCase();
    const municipio = this.municipioSeleccionado();
    const categoria = this.categoriaActiva();
    const filtros = this.filtrosRapidos();

    let resultado = this.ofertas().filter((oferta: any) => {
      const coincideTexto = !texto ||
        `${oferta.comercio} ${oferta.titulo} ${oferta.descripcion}`.toLowerCase().includes(texto);
      const coincideMunicipio = !municipio || oferta.municipio === municipio;
      const coincideCategoria = categoria === 'todas' || oferta.categoria === categoria;
      const coincideCerca = !filtros.includes('cerca') || oferta.cerca;
      const coincideHoy = !filtros.includes('hoy') || oferta.hoy;
      const coincideVegetariano = !filtros.includes('vegetariano') || oferta.vegetariano;

      return coincideTexto && coincideMunicipio && coincideCategoria &&
        coincideCerca && coincideHoy && coincideVegetariano;
    });

    if (filtros.includes('descuento')) {
      resultado = [...resultado].sort((a: any, b: any) => b.descuento - a.descuento);
    }

    return resultado;
  });

  readonly totalPaquetes = computed(() =>
    this.ofertas().reduce((total: number, oferta: any) => total + oferta.disponibles, 0)
  );

  alternarFiltro(clave: string): void {
    this.filtrosRapidos.update(filtros =>
      filtros.includes(clave)
        ? filtros.filter(filtro => filtro !== clave)
        : [...filtros, clave]
    );
  }

  filtroActivo(clave: string): boolean {
    return this.filtrosRapidos().includes(clave);
  }

  limpiarFiltros(): void {
    this.textoBusqueda.set('');
    this.municipioSeleccionado.set(null);
    this.categoriaActiva.set('todas');
    this.filtrosRapidos.set([]);
  }

  rescatar(oferta: any): void {
    console.log('Rescatar oferta', oferta);
  }

  cerrarSesion(): void {
    this.sesion.cerrar();
    this.router.navigate(['/login']);
  }
}
