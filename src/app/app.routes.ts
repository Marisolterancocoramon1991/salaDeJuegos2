import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RutaFalsaComponent } from './ruta-falsa/ruta-falsa.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { ChatComponent } from './components/chat/chat.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { JuegoMemoriaComponent } from './components/juego-memoria/juego-memoria.component';
import { BuscaMinasComponent } from './components/busca-minas/busca-minas.component';


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
    path: 'home/chat',
    component: ChatComponent,
},
{
    path: 'home/ahorcado',
    component: AhorcadoComponent,
},
{
    path: 'home/buscaminas',
    component: BuscaMinasComponent,
},
{
    path: 'home/juegoMemoria',
    component: JuegoMemoriaComponent,
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
