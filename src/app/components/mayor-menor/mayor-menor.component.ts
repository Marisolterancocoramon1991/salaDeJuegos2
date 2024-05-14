import { Component, OnInit } from '@angular/core';
import { Card, CardDTO } from '../../clases/cartas';
import { CartasService } from '../../services/cartas.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Validacion } from '../../clases/validacion';


@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [
    CommonModule ,
    MatCardModule,
  ],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit {

  public actionsBtn = true;
  public loader = true;
  private cards = ["ACE", "2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING"]
  public lowCards = ["ACE", 2, 3, 4, 5, 6, 7];
  public highCards = [8, 9, 10, "JACK", "QUEEN", "KING"];
  public BlankCard = "../../../assets/backCard.png";
  public deck_id!: string;
  public totalcurd!: number;
  public messageTuCarta: string = "Tu carta es";
  public messagePerdiste: string = "Perdiste!";
  public message: string = "";
  public actual!: Card;
  public proxima: Card | undefined;
  public correctas:number = 0;
  public cartasActuales: Card[] = [];
  public puntos: number = 0;

  constructor(private cartasService: CartasService, private router: Router) { }

  ngOnInit() {
    this.cartasService.startGame().subscribe((cards: CardDTO) => {     
      
      this.drawCards(cards.deck_id);
    });
  }

  existeCorreo() {
    const hayCorreo= Validacion.obtenerCorreo();
    return hayCorreo;
  }

  drawCards(deck_id: string) {
    this.deck_id = deck_id;    
    let cantidad = this.proxima === undefined ? 2 : 1;

    this.cartasService.drawCard(deck_id,cantidad).subscribe((cds: CardDTO) => {
      this.cartasActuales = [];

      if(this.proxima !== undefined)
      {               
        this.proxima = { ...cds.cards[0] }          
      }else{
        this.actual = { ...cds.cards[0] }
        this.proxima = { ...cds.cards[1] }   
      }
      let proxima = {...this.proxima}
      proxima.image = this.BlankCard;      

      this.cartasActuales.push(this.actual);
      this.cartasActuales.push(proxima);
      
      
      this.message = this.messageTuCarta;
      
      this.loader = false;

    }
    );
  }

  onSelectHigh() {
    this.changeCard(true);

  }
  onSelectLow() {
    this.changeCard(false);
  }
  onSelectTryAgain() {
    this.actionsBtn = true;
    this.message = this.messageTuCarta;
    this.loader = true;
    this.actual = undefined!
    this.proxima = undefined!
    this.puntos = 0;
    this.correctas = 0;
    this.cartasService.newGame(this.deck_id).subscribe((decks: CardDTO) => {
      this.drawCards(decks.deck_id);
    })
  }


  checkHighLow(masAlta:boolean) {
   
    let diferencia = this.getHigLow();
    
    if(diferencia === 0)    
      return 0    
    if (diferencia > 0 && masAlta)
      return 1
    if (diferencia < 0 && !masAlta)
      return 1
    
      return -1
  }

  getHigLow():number{    
    let diferencia = this.cards.indexOf(this.actual.value) - this.cards.indexOf(this.proxima!.value)    
    return diferencia > 0 ? 1 : diferencia < 0 ? -1 : 0;  
  }

  changeCard(masAlta: boolean) {
    this.cartasActuales[1].image = this.proxima!.image;


    let resultado = this.checkHighLow(masAlta)

    if (resultado===1) {
      this.message = "Ganaste!";
      this.loader = true;
      this.correctas ++;;
      this.puntos += Math.pow(2,this.correctas);
      this.actual = {...this.proxima} as Card;
      setTimeout(() => {this.drawCards(this.deck_id);},500);

    }else if (resultado===0) {
      this.message = "Empate!";
      this.loader = true;            
      this.cartasActuales[1].image = this.proxima!.image;
      this.actual = {...this.proxima} as Card;

      setTimeout(() => {this.drawCards(this.deck_id);},1000);
    }
    else {
      this.actionsBtn = false;
      this.message = "Perdiste!";
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}
