import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../timer/timer.component';
import { AhorcadoService } from '../../services/ahorcado.service';
import { PuntuacionService } from '../../services/puntuacion.service';
import { Validacion } from '../../clases/validacion';
import { CommonModule } from '@angular/common';
import { AhorcadoPalabraComponent } from '../ahorcado-palabra/ahorcado-palabra.component';
import { AhorcadoTecladoComponent } from '../ahorcado-teclado/ahorcado-teclado.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [
    CommonModule,
    AhorcadoPalabraComponent,
    AhorcadoTecladoComponent,
    MatIconModule,
    MatTooltipModule,
    TimerComponent,
  ],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
  
})
export class AhorcadoComponent implements OnInit, OnDestroy {
  isOpen = true;
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  private timerSubscription!: Subscription;
  puntos: number = 0;  
  word: string = '';
  words: string[] = [];
  guesses: string[] = [];
  restartGameBtnShown = false;
  time: number = 0;
  lives: number = 6; // Inicializar vidas

  constructor(private hangmanService: AhorcadoService,private puntuacion:PuntuacionService, private router: Router) { }
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.pickNewWord();
  }


  guess(obj: { keyValue: string, score: number }) {
    let letter = obj.keyValue;
    this.puntos = obj.score;
  
    if (this.guesses.length == 0) {
      this.timerComponent.startTimer();      
    }
  
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
  
    this.guesses = [...this.guesses, letter];
  
    if (!this.word.includes(letter)) {
      this.lives--; // Reducir vidas si la letra no está en la palabra
    }
  
    const wordGuessed = this.word.split('').every(letter => this.guesses.includes(letter));
  
    if (wordGuessed) {
      Swal.fire({
        title: '¡excelente!',
        text: '¡Usted ha podido a divinar la palabra exacta!'+ this.word + '¡Èxitos con la siguiente!',
        icon: 'success',
        confirmButtonText: '¡Entendido!',
        customClass: {
          container: 'custom-alert-container',
          confirmButton: 'custom-confirm-button'
        },
        backdrop: '#2196F3' // Fondo azul
      });
      this.reset();

    } else if (this.lives === 0) {
      this.onGameFinished(false);
    }
  }
  


  reset() {
    this.timerComponent.resetTimer();
    this.words.splice(this.words.indexOf(this.word), 1);
    this.pickNewWord();
    this.restartGameBtnShown = false;
    this.lives = 6; // Reiniciar vidas
  }

  pickNewWord() {
    this.hangmanService.getWords().subscribe((response) => {
      this.words = response.map((word) => word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.puntos = 0;
      this.word = this.words[randomIndex];
      console.log('Palabra seleccionada:', this.word);
      this.guesses = [];   
      this.lives = 6; // Reiniciar vidas   
    });   
  }

  onGameFinished(win: boolean) {
    this.time = this.timerComponent.stopTimer();
    
    if(win)    
    {
      this.calculatePoints()
      this.puntuacion.agregarPuntuacion(Validacion.obtenerCorreo(), this.puntos, "Ahorcado");
      this.reset();
    }else{
      this.puntos = 0;
    }
      

    this.restartGameBtnShown = true;
  }

  calculatePoints(){
    if(this.puntos>0)    
    this.puntos = parseInt((this.puntos * (this.word.length*20)/this.time).toFixed(0));
    console.log(this.puntos);
    return 0
  }
  goToHome() {
    this.router.navigate(['/home']);
  }


}
