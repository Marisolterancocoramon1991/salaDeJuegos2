import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardDTO } from '../clases/cartas';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  private apiBase: string = "https://deckofcardsapi.com/api/deck/";
  
  constructor(private http: HttpClient) { }

  newGame(deckId: string) {
    return this.http.get<CardDTO>(this.apiBase + deckId + "/shuffle/")
  }

  drawCard(deckId: string,count:number=1) {
    return this.http.get<CardDTO>(this.apiBase + deckId + "/draw/?count="+count)
  }


  startGame() {
    return this.http.get<CardDTO>(this.apiBase + "new/shuffle/?deck_count=2")
  }
}
