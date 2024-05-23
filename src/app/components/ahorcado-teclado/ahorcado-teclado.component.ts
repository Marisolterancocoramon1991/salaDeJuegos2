import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IKey } from '../../clases/key.interface';
import KEY_CHARS from '../../clases/keyCharacters.const';



@Component({
  selector: 'app-ahorcado-teclado',
  standalone: true,
  imports: [CommonModule,
  ],
  templateUrl: './ahorcado-teclado.component.html',
  styleUrl: './ahorcado-teclado.component.css'
})
export class AhorcadoTecladoComponent implements OnInit, OnChanges {
  @Input() word = '';
  @Input() @Output() puntos:number = 0;
  @Output() keyPressed = new EventEmitter<{keyValue:string,score:number}>();
  keys: IKey[] = [];
  constructor() {
    this.setKeys();
  }

  ngOnInit(): void {
  console.log(KEY_CHARS);
    this.setKeys();
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if (
      changes?.['word']?.currentValue &&
      changes?.['word'].currentValue !== changes?.['word'].previousValue
    ) {
      this.addMissingKeys();
      this.setKeys();
    }
  }

  addMissingKeys(): void {    
    for (let i = 0; i < this.word.length; i++) {
      const keyExists = this.keys.find((key) => {
        return key.value.toLowerCase() === this.word[i].toLowerCase();
      });
      if (keyExists) {
        continue;
      }
      const randomIndex = Math.floor(Math.random() * 11);
      this.keys.splice(randomIndex, 0, {
        value: this.word[i],
        guessed: false,
        error: true,
      });
    }
  }

  onKeyClick(key: IKey): void {    
    if (key.guessed) {
      return;
    }
    key.guessed = true;
    key.error = this.word.toLowerCase().indexOf(key.value.toLowerCase()) === -1;
    this.puntos += key.error? -3 : 5;    
    
    this.keyPressed.emit({keyValue:key.value,score:this.puntos});
  }

  setKeys()
  {
    this.keys = KEY_CHARS.split('').map((key) => {
      return {
        value: key,
        guessed: false,
        error: false,
      };
    });
  }

}
