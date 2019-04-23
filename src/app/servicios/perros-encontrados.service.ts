import { HttpClient } from '@angular/common/http';
import { Encontrado } from './../perdidos/formulario-encontrado/encontrado.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerrosEncontradosService {

  constructor(private http: HttpClient) { }

  mandarAnuncioEncontrado(data: Encontrado) {
    console.log(data);
    return this.http.post('https://findme-proyecto-9d68a.firebaseio.com/mensajes-encontrados.json', data);
  }
}
