import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-life',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  
  templateUrl: './life.component.html',
  styleUrl: './life.component.css'
})
export class LifeComponent implements OnInit{
  @Input() maxMistakes: number = 0;
  mistakesRemaining: number = 0;

  constructor() {
   
  }
  ngOnInit(): void {
    this.mistakesRemaining = this.maxMistakes;
  }
  get mistakeArray(): any[] {
    return new Array(this.mistakesRemaining);
  }

  decreaseMistakesRemaining(decrease:boolean) {
    if(decrease)   
    this.mistakesRemaining--;
  }

  restartMistakesRemaining() {
    this.mistakesRemaining = this.maxMistakes;
  }

}
