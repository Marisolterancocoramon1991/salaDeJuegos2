import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenMoeriaService {
  private readonly unsplashUrl = 'https://api.unsplash.com/photos/card';
  private readonly clientId = '0bhOSgVvkXRU4X1k0d89MAccU1qwGkwG4bKxDviwvuw';

  constructor(private http: HttpClient) {}

  getImages(count: number): Observable<string[]> {
    return this.http.get<any[]>(`${this.unsplashUrl}?client_id=${this.clientId}&count=${count}`)
      .pipe(
        map(response => response.map(image => image.urls.small))
      );
  }
}
