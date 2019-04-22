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
    
  }
}
