import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombres: string = '';
  apellidos: string = '';
  correo: string = '';
  codigo_estudiante: string = '';
  contrasena: string = '';
  correoA: string = '';
  carrera: string = '';
  ciclo: string = '';
  edad: string = '';
  sexo: string = '';

  // Propiedades para el campo de contraseña
  passwordInputType: string = 'password';
  showPasswordIcon: string = 'eye-off-outline';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    // Validaciones básicas
    if (
      !this.nombres ||
      !this.apellidos ||
      !this.correo ||
      !this.codigo_estudiante ||
      !this.contrasena ||
      !this.carrera ||
      !this.ciclo ||
      this.edad === null || // Check for null explicitly if 0 is a valid age
      !this.sexo
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.contrasena.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Validar formato de correo institucional
    if (!this.correo.endsWith('@ucvvirtual.edu.pe')) {
      alert('El correo debe ser institucional y terminar en @ucvvirtual.edu.pe');
      return;
    }

    // Si todo está bien, llama al servicio
    this.userService
      .createUser(
        this.nombres,
        this.apellidos,
        this.correo,
        this.codigo_estudiante,
        this.contrasena,
        this.correoA,
        this.carrera,
        this.ciclo,
        this.edad, // Revertido a string
        this.sexo
      )
      .subscribe(
        (response: any) => {
          console.log('Usuario registrado con éxito', response);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Error al registrar el usuario', error);
          let errorMessage =
            'Error al registrar el usuario. Por favor, intente de nuevo.';
          if (error.error && error.error.message) {
            if (Array.isArray(error.error.message)) {
              errorMessage = error.error.message.join('\n');
            } else {
              errorMessage = error.error.message;
            }
          }
          alert(errorMessage);
        }
      );
  }

  ngOnInit() {}

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
      this.showPasswordIcon = 'eye-outline';
    } else {
      this.passwordInputType = 'password';
      this.showPasswordIcon = 'eye-off-outline';
    }
  }
}
