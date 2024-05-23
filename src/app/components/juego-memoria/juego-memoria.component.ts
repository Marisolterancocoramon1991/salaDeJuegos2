import { Component, OnInit } from '@angular/core';

import { Card } from '../../clases/card.model';
import { JuegoMemoriaService } from '../../services/juego-memoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego-memoria',
  templateUrl: './juego-memoria.component.html',
  styleUrls: ['./juego-memoria.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class JuegoMemoriaComponent implements OnInit {
  cards: Card[] = [];
  matchedPairs: number = 0;

  constructor(private juegoMemoriaService: JuegoMemoriaService) {}

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    this.juegoMemoriaService.initializeCards();
    this.cards = this.juegoMemoriaService.getCards();
  }

  onCardClicked(card: Card) {
    this.juegoMemoriaService.flipCard(card);
    if (this.juegoMemoriaService.checkWin()) {
      alert('¡Has ganado!');
    }
  }

  onResetGame() {
    this.juegoMemoriaService.resetGame();
    this.cards = this.juegoMemoriaService.getCards();
  }
}

