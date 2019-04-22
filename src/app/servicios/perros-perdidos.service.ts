import { Anuncio } from './../perdidos/crear-anuncio/anuncio.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerrosPerdidosService {

  constructor(private http: HttpClient) { }

  agregarAnuncio(anuncio: Anuncio) {
    console.log(anuncio);
    return this.http.post('https://findme-proyecto-9d68a.firebaseio.com/anuncios.json', anuncio);
  }
}
