import { Injectable } from '@angular/core';
import { Card } from '../clases/card.model';
import { ImagenMoeriaService } from './imagen-moeria.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JuegoMemoriaService {
  private cards: Card[] = [];
  private flippedCards: Card[] = [];

  constructor(private ImagenMoeriaService: ImagenMoeriaService) {}

  initializeCards(): Observable<Card[]> {
    return this.ImagenMoeriaService.getImages(8).pipe(
      map(images => {
        this.cards = [];
        let id = 1;

        images.forEach(image => {
          // Creamos dos cartas para cada imagen
          this.cards.push({ id: id++, image, isFlipped: false, isMatched: false });
          this.cards.push({ id: id++, image, isFlipped: false, isMatched: false });
        });

        this.shuffleCards();
        return this.cards;  // Devolvemos las cartas inicializadas
      })
    );
  }

  private shuffleCards() {
    // Barajamos las cartas utilizando el algoritmo de Fisher-Yates
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public checkMatch(card1: Card, card2: Card): boolean {
    return card1.image === card2.image;
  }

  public flipCard(card: Card) {
    if (this.flippedCards.length < 2) {
      card.isFlipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        const [firstCard, secondCard] = this.flippedCards;
        if (this.checkMatch(firstCard, secondCard)) {
          firstCard.isMatched = true;
          secondCard.isMatched = true;
        } else {
          setTimeout(() => {
            firstCard.isFlipped = false;
            secondCard.isFlipped = false;
          }, 1000);
        }
        this.flippedCards = [];
      }
    }
  }

  public resetGame(): Observable<Card[]> {
    return this.initializeCards();
  }

  public checkWin(): boolean {
    return this.cards.every(card => card.isMatched);
  }
}
