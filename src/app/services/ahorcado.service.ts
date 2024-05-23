import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiPath = 'https://clientes.api.greenborn.com.ar/public-random-word?c=5&l=';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  constructor(private http: HttpClient) { }

  getWords() {        
    let large = Math.floor(Math.random() * 10 + 3);
    
    return this.http.get<string[]>(apiPath+large);
  }
}
