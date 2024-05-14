import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { QuestionsResponse } from '../../clases/questionsResponse.interface';
import { PreguntadosService } from '../../services/preguntados.service';
import { Subscription } from 'rxjs';
import { PuntuacionService } from '../../services/puntuacion.service';
import { FlaticonService } from '../../services/flaticon.service';
import { LifeComponent } from '../../components/life/life.component';
import { Validacion } from '../../clases/validacion';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit, OnDestroy {
  @ViewChild(LifeComponent) lifes!: LifeComponent;
  questionsFromService?: QuestionsResponse[];
  currentQuestion?: QuestionsResponse;
  private questionSub!: Subscription;
  answers: string[] = [];
  gameStarted = false;
  
  hits = 0;
  points = 0;
  guessed = false;
  notGuessed = false;
  isFinished = false;
  maxMistakes = 7;
  mistakesRemaining:number = this.maxMistakes;

  ngOnInit(): void {
    if (!this.questionSub) {
      this.questionSub = this.preguntadosService.getRandomQuestions().subscribe((data) => {
        this.questionsFromService = data;
        this.mistakesRemaining = this.maxMistakes;
      });
    }
  }
  ngOnDestroy(): void {
    this.questionSub.unsubscribe();
  }
  constructor(private router: Router, private preguntadosService: PreguntadosService, private puntuacionService: PuntuacionService, private flaticonService: FlaticonService) {
  }

  startGame() {

    this.gameStarted = true;
    if (this.questionsFromService!.length > 0) {
      this.chooseRandomQuestion();
      console.log(Validacion.obtenerCorreo()+"que hay aqui");
    }
  }
  goToHome() {
    this.router.navigate(['/home']);
  }

  getRandomAnswers() {
    let answers: string[] = [];
    answers.push(...this.currentQuestion!.incorrectAnswers);
    let random = Math.floor(Math.random() * answers.length)
    answers.splice(random, 0, this.currentQuestion!.correctAnswer);

    this.answers = answers;

  }

  checkAnswer(currentAnswer: string) {
    if (currentAnswer.trim() === this.currentQuestion!.correctAnswer.trim()) {
      this.guessed = true;
      this.notGuessed = false;
      this.hits += 1;
      this.points += 5;
    } else {
      this.notGuessed = true;
      this.guessed = false;
      this.mistakesRemaining--;
      if (this.lifes) {
        this.lifes.decreaseMistakesRemaining(true);
      }
    }
  
    if (this.mistakesRemaining === 0) {
      this.isFinished = true;
      this.puntuacionService.agregarPuntuacion(Validacion.obtenerCorreo(), this.points,"preguntados");
    } else {
      this.chooseRandomQuestion();
    }
  }
  

  chooseRandomQuestion() {

    this.questionSub = this.preguntadosService.getRandomQuestions().subscribe((data) => {
      this.questionsFromService = data;      
      //random question from data
      this.currentQuestion = this.questionsFromService![Math.floor(Math.random() * this.questionsFromService!.length)];
      this.getImage(this.currentQuestion.category);
      this.getRandomAnswers();
    });
  }

  resetGame() {
    this.mistakesRemaining = this.maxMistakes;
    this.points = 0;
    this.guessed = false;
    this.notGuessed = false;
    this.isFinished = false;
    this.chooseRandomQuestion();
  }

  image:string = "";
  getImage(category: string) {
    this.flaticonService.getImage(category).then(blob => {
      blob.subscribe(image => {
        const blob = new Blob([image], { type: 'image/jpeg' }); // Asegúrate de establecer el tipo MIME correcto

        // Crea una URL (Object URL) para el Blob
        this.image = URL.createObjectURL(blob);
      })
    })
  }

  getCategorySpanish(category: string | undefined) {
    switch (category) {
      case "society_and_culture":
        return "Sociedad y cultura"
      case "film_and_tv":
        return "Cine y televisión"
      case "music":
        return "Música"
      case "science":
        return "Ciencia"
      case "entertainment":
        return "Entretenimiento";
      case "general_knowledge":
        return "Conocimiento general"
      case "history":
        return "Historia"
      case "sport_and_leisure":
        return "Deporte y recreación"
      case "geography":
        return "Geografía"
      case "arts_and_literature":
        return "Arte y literatura"
      default:
        return "Categoria inexistente"
    }
  }

  existeCorreo() {

    const hayCorreo = Validacion.obtenerCorreo();
    return hayCorreo;
  }


}
