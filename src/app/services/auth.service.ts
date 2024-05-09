import { Injectable } from '@angular/core';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { addDoc, collection,getDoc, getDocs, updateDoc, doc} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState, user} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private authF : Auth,private firestore: Firestore) { }
  public correoValidar?  : string =  '';
  async registro (correo: string, contrasena: string)
  {
    try {
      const usoDeCredencial = await createUserWithEmailAndPassword (this.authF, correo, contrasena);
      const creacionDeTiempo = usoDeCredencial.user.metadata.creationTime;
      const formatoDelDato = creacionDeTiempo ? new Date (creacionDeTiempo).toLocaleDateString('es-Ar') : "";
      const coleccion = collection(this.firestore,'/usuarios');
      addDoc(coleccion,{correo: correo, contrasena: contrasena, fechaAlta: formatoDelDato});
      this.correoValidar = correo;

      
    } catch (error) {
      console.error('hubo algun tipo al registrar al cliente', error);
      throw error;
    }

  }
  async inicioSesion(correoElectronico: string, contrasena: string): Promise<any> {
    try {
      const credencialUsuario = await signInWithEmailAndPassword(this.authF, correoElectronico, contrasena);
      this.correoValidar = correoElectronico;
      return credencialUsuario.user;
    } catch (error) {    
      console.error('Error durante el inicio de sesión:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.authF);
      this.correoValidar = '';
    } catch (error) {
      throw error;
    }
  }
  
}
