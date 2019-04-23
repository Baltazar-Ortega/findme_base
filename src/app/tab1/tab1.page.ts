
import { PerrosPerdidosService } from '../servicios/perros-perdidos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private perrosPerdidosServicio: PerrosPerdidosService) {}

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.obtenerAnuncios();
    this.obtenerAnuncio();
  }

  obtenerAnuncios() {
    this.perrosPerdidosServicio.obtenerAnuncios().subscribe((datos) => {
      console.log(datos);
      console.log(typeof datos);
    });
  }

  obtenerAnuncio() {
    // this.perrosPerdidosServicio.obtenerAnuncio('-Ld6C2CaqNlg3mdfl0lF');
  }

}
