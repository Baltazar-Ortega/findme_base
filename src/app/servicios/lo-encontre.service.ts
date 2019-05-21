
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoEncontreService {

  perroSeleccionado: any;

  constructor() { }

  setPerroSeleccionado(perro) {
    this.perroSeleccionado = perro;
  }

  getPerroSeleccionado() {
    return this.perroSeleccionado;
  }

}
