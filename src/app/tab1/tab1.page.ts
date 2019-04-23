
import { PerrosPerdidosService } from '../servicios/perros-perdidos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaPerros: any;
  constructor(private perrosPerdidosServicio: PerrosPerdidosService) {}

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.obtenerAnuncios();
    
  }

  obtenerAnuncios() {
    setTimeout(() => {
      this.listaPerros = this.perrosPerdidosServicio.todosPerrosPerdidos;
      console.log(this.listaPerros);
      this.obtenerAnuncio();
    }, 5000);
    /* Para tener listos a los perros, despues se ejecuta el setTimeOut */
    this.perrosPerdidosServicio.obtenerAnuncios();
  }

  obtenerAnuncio() {
    const perro = this.perrosPerdidosServicio.obtenerAnuncio('-Ld6C2CaqNlg3mdfl0lF');
    console.log(perro);
  }

}
