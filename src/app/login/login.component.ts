import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { core } from '@angular/compiler';
import { Validacion } from '../clases/validacion';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private AuthService : AuthService, private router:Router){}

  registrarUsuario() 
  {

    const correo: string = (document.getElementById('correo') as HTMLInputElement).value.trim();
    const contrasena: string = (document.getElementById('contrasena') as HTMLInputElement).value.trim();
   
    
  const validador = new Validacion();
    // Validar que todos los campos estén completos
    if (  correo && contrasena) 
      {
        if(validador.validarFormatoCorreo(correo))
          {
            try 
            {
            this.AuthService.registro(correo, contrasena);
            const appComponent = new Validacion();
             appComponent.cambiarPestana();
             const correoCargar = Validacion.cargarCorreo(correo);
             Swal.fire({
              title: '¡Bienvenido!',
              text: '¡Muchas gracias por registrarte y disfruta de una nueva aventura!',
              icon: 'success',
              confirmButtonText: '¡Entendido!',
              customClass: {
                container: 'custom-alert-container',
                confirmButton: 'custom-confirm-button'
              },
              backdrop: '#2196F3' // Fondo azul
            });
            this.router.navigateByUrl('/home');
            }catch (error)
             {
              console.error("Error al intentar registrar usuario:", error);
             
            }
          }
    } else
     {
        // Mostrar un mensaje de error si algún campo está vacío
        console.error("Por favor, complete todos los campos del formulario.");
    }
  }
  async buscarUsuario() {
    let correo = (document.getElementById("username") as HTMLInputElement).value.trim();
    let contrasena = (document.getElementById("password") as HTMLInputElement).value.trim();
    let formlogin = document.getElementById('loginForm');
    
    if (correo === "" || contrasena === "") {
      Swal.fire({
        title: '¡error!',
        text: '¡ojo! no puedes dejar los campos vacios',
        icon: 'error',
        confirmButtonText: '¡Entendido!',
        customClass: {
          container: 'custom-alert-container',
          confirmButton: 'custom-confirm-button'
        },
        backdrop: '#2196F3' // Fondo azul
      });
      return; // Detener la ejecución si falta algún campo
    }
  
    try {
      await this.AuthService.inicioSesion(correo, contrasena);
      (document.getElementById("username") as HTMLInputElement).value = '';
      (document.getElementById("password") as HTMLInputElement).value = '';
      if (formlogin) {
        formlogin.classList.add('form-desaparecer');
        // Opcional: Agregar un tiempo de espera antes de desaparecer el formulario
        setTimeout(() => {
          formlogin.style.display = 'none';
        }, 500);
      }
      const correoCargar = Validacion.cargarCorreo(correo);
      this.router.navigateByUrl('/home');
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      // Puedes hacer algo más con el error aquí, como mostrar un mensaje al usuario
    }
  }
  
  animacionRegistro(): void {
    // Aquí puedes escribir la lógica para buscar usuarios
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;  
    const formlogin = document.getElementById('loginForm');
    const formRegistro = document.getElementById('registerForm');

    if (formlogin && formRegistro) {
      formlogin.classList.add('form-desaparecer');
      
      // Opcional: Agregar un tiempo de espera antes de desaparecer el formulario
      setTimeout(() => {
        formlogin.style.display = 'none';
        

      }, 500); // 500 ms es el tiempo de duración de la animación en CSS
      
      setTimeout(() => {
        formRegistro.style.display = 'block';
        formRegistro.classList.add('form-aparecer');
      },500);
      
    }

    



  }

  completarAutomaticamente(): void {
  
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (usernameInput && passwordInput) {
      usernameInput.value = 'kervin@gmail.com';
      passwordInput.value = '123456';
    }
  }

}
