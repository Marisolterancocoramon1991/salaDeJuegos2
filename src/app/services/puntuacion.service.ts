import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  constructor(private firestore: Firestore) { }

  async buscarIdUsuario(correo: string): Promise<string | null> {
    try {
      // Realizar la consulta para buscar el ID del usuario por su correo
      const usuariosRef = collection(this.firestore, 'usuarios');
      const q = query(usuariosRef, where('correo', '==', correo));
      const querySnapshot = await getDocs(q);

      // Verificar si se encontraron resultados
      if (!querySnapshot.empty) {
        // Devolver el ID del primer usuario encontrado
        return querySnapshot.docs[0].id;
      } else {
        console.warn(`No se encontró un usuario con el correo ${correo}`);
        return null;
      }
    } catch (error) {
      console.error('Error al buscar el ID del usuario:', error);
      throw error;
    }
  }
  async agregarPuntuacion(correo: string, puntuacion: number, juego: string): Promise<boolean> {
    try {
      // Buscar el ID del usuario a partir del correo
      const idUsuario = await this.buscarIdUsuario(correo);

      // Verificar si se encontró un ID válido
      if (idUsuario) {
        // Crear una referencia a la colección de puntuaciones
        const puntuacionRef = collection(this.firestore, 'puntuacion');

        // Agregar un nuevo documento con el ID del usuario, la puntuación y el tipo de juego
        await addDoc(puntuacionRef, { idUsuario, puntuacion, juego });
        return true; // Indicar que la operación se realizó correctamente
      } else {
        console.error(`No se encontró un usuario con el correo ${correo}`);
        return false; // Indicar que la operación no se pudo completar
      }
    } catch (error) {
      console.error('Error al agregar la puntuación:', error);
      return false; // Indicar que la operación no se pudo completar
    }
  }
  
}
