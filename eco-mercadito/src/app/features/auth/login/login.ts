import { Component, inject, signal } from '@angular/core';
import {AuthService} from '../../../services/authetificacion/auth.service';
import {NotificacionService} from '../../../services/notificacion/notificacion.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {environment} from '../../../../environments/environment';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notificacion = inject(NotificacionService);
  private readonly router = inject(Router);
  appName = environment.appName;
  appCity = environment.city;
  ahora = environment.ahora;

  readonly cargando = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255)
    ]],
    password: ['', [
      Validators.required,
      Validators.maxLength(255)
    ]],
    recordar: [true]
  });

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }

  iniciarSesion(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credenciales = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    };

    this.cargando.set(true);

    this.authService.login(credenciales).subscribe({
      next: (data: any) => {
        this.cargando.set(false);

        this.notificacion.exito(
          `Bienvenido, ${data.data?.nombre ?? ''}`
        );

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error: Login', err);

        this.notificacion.error(
          err.error?.errors ?? 'No fue posible iniciar sesión. Verifica tus credenciales.'
        );

        this.cargando.set(false);
      }
    });
  }

}
