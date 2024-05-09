export class Validacion {
  static correo: string;
  
  verificarVacio(parametro: string ) {
    // Verificar si el parámetro es null, undefined o una cadena vacía
    if (parametro === null || parametro === undefined || parametro === '') {
        return false; // Está vacío
    } else {
        return true; // No está vacío
    }
}

    validarFormatoCorreo(correo: string) {
        let arrobaEncontrada = false;
        let puntoComEncontrado = false;
    
        for (let i = 0; i < correo.length; i++) {
            if (correo[i] === '@') {
                arrobaEncontrada = true;
            } else if (correo[i] === '.' && arrobaEncontrada) {
                puntoComEncontrado = true;
            }
        }
    
        return arrobaEncontrada && puntoComEncontrado;
    }
    cambiarPestana()
    {
      const formularioInicioSesion = document.getElementById("loginForm");
      const formularioRegistro = document.getElementById("registerForm"); 
      if(formularioInicioSesion && formularioRegistro){
        if(formularioInicioSesion.style.display === "block")
          {
            formularioInicioSesion.style.display = "none";
            formularioRegistro.style.display = "block";
          }else
          {
            formularioInicioSesion.style.display = "block";
            formularioRegistro.style.display = "none";
          }
       
      }
    
    }
   static  cargarCorreo(nuevoCorreo: string) {
      this.correo = nuevoCorreo;
    }
  
    static  borrarCorreo() {
      this.correo = '';
    }
  
    static obtenerCorreo() {
      return this.correo;
    }
}


