import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsuarioService} from '../../../services/usuario/usuario.service';
import {NotificacionService} from '../../../services/notificacion/notificacion.service';
import {Router, RouterLink} from '@angular/router';
import {MunicipioService} from '../../../services/municipio/municipio.service';
import {forkJoin} from 'rxjs';
import {ButtonModule} from 'primeng/button';
import {NgClass} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import {SelectModule} from 'primeng/select';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-crear-cuenta',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './crear-cuenta.html',
  styleUrl: './crear-cuenta.css',
})
export class CrearCuenta implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService)
  private readonly notificacion = inject(NotificacionService)
  private readonly municipioService = inject(MunicipioService);
  private readonly router = inject(Router);
  appName = environment.appName;
  appCity = environment.city;
  ahora = environment.ahora;

  readonly guardado = signal(false)
  readonly enviado = signal(false)
  readonly cargandoMunicipios = signal(false);

  readonly municipios = signal<any[]>([]);

  readonly roles = [
    {
      label: 'Consumidor',
      value: 1,
      descripcion: 'Ahorra & rescata'
    },
    {
      label: 'Comercio',
      value: 2,
      descripcion: 'Vende excedentes'
    }
  ];

  readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', [
      Validators.required,
      Validators.maxLength(150)
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255)
    ]],
    telefono: ['', [
      Validators.maxLength(20),
      Validators.pattern(/^[0-9+\-()\s]+$/)
    ]],
    municipioId: [null, [
      Validators.required
    ]],
    rolId: [0, [
      Validators.required,
      Validators.min(1),
      Validators.max(2)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(250)
    ]],
    confirmarPassword: ['', [
      Validators.required
    ]],
    aceptarTerminos: [false, [
      Validators.requiredTrue
    ]]
  });

  ngOnInit() {
    this.cargandoMunicipios.set(true)

    forkJoin([
      this.municipioService.obtenerTodos(1, 100),
      this.municipioService.obtenerTodos(2, 100),
      this.municipioService.obtenerTodos(3, 100)
    ]).subscribe({
      next: (data: any[]) => {
        const municipios = data.flatMap(
          (respuesta: any) => respuesta.data?.data ?? []
        );

        const opciones = municipios
          .filter((municipio: any) =>
            municipio?.municipioId != null &&
            municipio?.nombre
          )
          .map((municipio: any) => ({
            label: String(municipio.nombre).trim(),
            value: Number(municipio.municipioId)
          }));

        this.municipios.set(opciones);
        this.cargandoMunicipios.set(false);
      },
      error: (err) => {
        console.error('Error: Cargar municipios', err);

        this.municipios.set([]);
        this.cargandoMunicipios.set(false);

        this.notificacion.error(
          'No fue posible cargar los municipios. Intenta recargar la página.'
        );
      }
    })
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || this.enviado());
  }

  passwordsCoinciden(): boolean {
    const password = this.form.controls.password.value;
    const confirmarPassword = this.form.controls.confirmarPassword.value;

    return password === confirmarPassword;
  }

  confirmarPasswordInvalida(): boolean {
    const control = this.form.controls.confirmarPassword;

    return (
      !this.passwordsCoinciden() &&
      (control.touched || this.enviado())
    );
  }

  crearCuenta(): void {
    this.enviado.set(true)

    if (this.form.invalid || !this.passwordsCoinciden()) {
      this.form.markAllAsTouched()

      this.notificacion.advertencia(
        'Completa correctamente todos los campos requeridos.'
      )

      return;
    }

    const request = {
      nombre: this.form.controls.nombre.value.trim(),
      email: this.form.controls.email.value.trim(),
      telefono: this.form.controls.telefono.value.trim() || null,
      municipioId: this.form.controls.municipioId.value,
      rolId: this.form.controls.rolId.value,
      password: this.form.controls.password.value
    }

    this.guardado.set(true);

    this.usuarioService.crear(request).subscribe({
      next: (data: any) => {
        this.guardado.set(false)

        if(!data.success) {
          this.notificacion.error(
            data.message ?? 'No fue posible crear la cuenta.'
          )
          return;
        }

        this.notificacion.exito(
          data.message ?? 'Cuenta creada correctamente.'
        )

        this.form.reset({
          nombre: '',
          email: '',
          telefono: '',
          municipioId: null,
          rolId: 0,
          password: '',
          confirmarPassword: '',
          aceptarTerminos: false
        });

        this.enviado.set(false);

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.notificacion.error(
          err.error?.message ??
          'No fue posible crear la cuenta. Intenta nuevamente.'
        );

        this.guardado.set(false);
      }
    });

  }
}
