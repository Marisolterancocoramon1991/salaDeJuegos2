import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validacion } from '../../clases/validacion';

@Component({
  selector: 'app-busca-minas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './busca-minas.component.html',
  styleUrl: './busca-minas.component.css'
})
export class BuscaMinasComponent {
  rows: number = 8; // Número de filas del tablero
  cols: number = 8; // Número de columnas del tablero
  mines: number = 10; // Número de minas en el tablero
  board: any[] = []; // Matriz que representa el tablero
  message: string = ''; // mensaje a revelar
  gameOver: boolean = false;
  point: number = 0;

  constructor(private router: Router){}
  existeCorreo() { 
    return Validacion.obtenerCorreo();
  }

  ngOnInit(): void {
    this.generateBoard();
    this.placeMines();
    this.calculateAdjacent();
  }

  // Generar tablero vacío
  generateBoard(): void {
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j] = { isMine: false, revealed: false, value: 0 };
      }
    }
  }

  // Colocar minas aleatoriamente en el tablero
  placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (!this.board[row][col].isMine) {
        this.board[row][col].isMine = true;
        minesPlaced++;
      }
    }
  }

  // Calcular el número de minas adyacentes para cada casilla
  calculateAdjacent(): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (!this.board[i][j].isMine) {
          let count = 0;
          // Verificar las 8 casillas adyacentes
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              const newRow = i + x;
              const newCol = j + y;
              if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                if (this.board[newRow][newCol].isMine) {
                  count++;
                }
              }
            }
          }
          this.board[i][j].value = count;
        }
      }
    }
  }

  // Revelar casilla
  revealCell(row: number, col: number): void {
    if (!this.board[row][col].revealed) { // Verificar si la celda ya ha sido revelada
      if (this.board[row][col].isMine) {
        this.board[row][col].color = 'green'; 
        console.log("estoy adentro");
        this.message = '¡Ups! Has tocado una mina. ¡Juego terminado!';
        this.gameOver= true;
      } else {
        // Si la casilla no tiene una mina, simplemente cambiamos su color de fondo
        this.board[row][col].color = 'red';
        this.point++;
        this.message = '¡Bien hecho! Has evitado la mina. Tienes esta puntuacion: '+ this.point;
        console.log("es correcta la entrada");
        
      }
      this.board[row][col].revealed = true; // Marcar la celda como revelada
    }
  }
  

  // Reiniciar juego
  restartGame(): void {
    // Reinicializar el tablero
    this.generateBoard();
    // Colocar nuevas minas
    this.placeMines();
    // Recalcular los números adyacentes
    this.calculateAdjacent();
    this.gameOver= false;
    this.message="nueva partida...";
    this.point = 0;
  }
  goToHome() {
    this.router.navigate(['/home']);
  }  

  showStars() {
    document.body.classList.add('stars-effect');
  }
  
}
