import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Validacion } from '../clases/validacion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('parrafoCorreo', { static: true }) correoParagraph!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit() {  
    // Obtener el correo cargado
    const correo = Validacion.obtenerCorreo();
    this.actualizarCorreo(correo);

    
  }

  actualizarCorreo(correo: string) {
    // Actualizar el contenido del párrafo
    if (this.correoParagraph) {
      this.correoParagraph.nativeElement.textContent = correo;
      console.log(correo);
    }
  }

  existeCorreo() {
    const hayCorreo = Validacion.obtenerCorreo(); 
    return !!hayCorreo;
  }

  llevarLogin() {
    this.router.navigateByUrl('/login');
  }

  llevarAhorcado() {
    this.router.navigateByUrl('/login');
  }

  llevarMayorMenor() {
    this.router.navigateByUrl('/login');
  }

  llevarPreguntados() {
    this.router.navigateByUrl('/login');
  }
}

