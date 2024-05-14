import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RutaFalsaComponent } from './ruta-falsa/ruta-falsa.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';

export const routes: Routes = [ {
    path: '',
    component: HomeComponent,
},
{
    path: 'home',
    component: HomeComponent,
},
{
    path: 'mayorMenor',
    component: MayorMenorComponent,
},
{
    path: 'login',
    component: LoginComponent,
},
{
    path: 'quienSoy',
    component: QuienSoyComponent,
},
{
    path: 'preguntados',
    component: PreguntadosComponent,
},
{
    path: '**',
    component : RutaFalsaComponent,
}];
