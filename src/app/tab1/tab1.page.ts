
import { PerrosPerdidosService } from '../servicios/perros-perdidos.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaPerros: any;
  listaLista = false;
  constructor(private perrosPerdidosServicio: PerrosPerdidosService) {}

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.obtenerAnuncios();
  }

  obtenerAnuncios() {
    this.perrosPerdidosServicio.obtenerAnuncios().subscribe(datos => {
      console.log('Datos traidos del servicio', datos);
      this.perrosPerdidosServicio.todosPerrosPerdidos = datos;
      console.log(this.perrosPerdidosServicio.todosPerrosPerdidos);
      this.listaPerros = this.perrosPerdidosServicio.todosPerrosPerdidos;
      console.log('MI LISTA DE PERROS', this.listaPerros);
      console.log('Ubicacion del primer perro', this.listaLista[0]);
    }, error => {
      console.log(error);
    }, () => {
      console.log('completado');
      this.listaLista = true;
    });
  }

  obtenerAnuncio(key: string) {
    const perro = this.perrosPerdidosServicio.obtenerAnuncio(key);
    console.log(perro);
  }

  private formatoFecha(fecha: Date) {
    let month = String(fecha.getMonth() + 1);
    let day = String(fecha.getDate());
    const year = String(fecha.getFullYear());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return `${day}/${month}/${year}`;
  }

}
