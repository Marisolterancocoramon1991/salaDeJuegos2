import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { Validacion } from './clases/validacion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"sala-de-juegos-kervin","appId":"1:670052632466:web:1096e54eccc9dcba05a34b","storageBucket":"sala-de-juegos-kervin.appspot.com","apiKey":"AIzaSyD6g9gjf3ad8U2Y9PLXznlqMKrhDxy6RkU","authDomain":"sala-de-juegos-kervin.firebaseapp.com","messagingSenderId":"670052632466"}))), importProvidersFrom(provideAuth(() => getAuth())),
   importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage())), provideHttpClient(), Validacion
  ,BrowserAnimationsModule, NoopAnimationsModule]
   
  
};
