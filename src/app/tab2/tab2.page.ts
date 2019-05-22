import { ActivatedRoute } from '@angular/router';
import { DetalleEncontradoComponent } from './../encontrados/detalle-encontrado/detalle-encontrado.component';
import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { PerrosEncontradosService } from '../servicios/perros-encontrados.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selectKm: any = 'all';
  filtro = false;
  listaPerros: any;
  listaLista = false;
  constructor(private perrosEncontradosServicio: PerrosEncontradosService,
              public modal: ModalController, private route: ActivatedRoute) {
                this.route.params.subscribe((data) => {
                  console.log('CONSTRUCTOR');
                  this.obtenerAnuncios();
                });
              }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    console.log('ngOnInit');
  }

  obtenerAnuncios() {
    const filtroValue = this.selectKm;
    this.perrosEncontradosServicio.obtenerAnuncios(filtroValue).subscribe(datos => {
      console.log('Datos traidos del servicio', datos);
      this.perrosEncontradosServicio.todosPerrosEncontrados = datos;
      console.log(this.perrosEncontradosServicio.todosPerrosEncontrados);

      // segun el filtro
      this.listaPerros = this.perrosEncontradosServicio.todosPerrosEncontrados;
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
    const perro = this.perrosEncontradosServicio.obtenerAnuncio(key);
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
    switch(month){
      case '01': month = 'Enero'; break;
      case '02': month = 'Febrero'; break;
      case '03': month = 'Marzo' ; break;
      case '04': month = 'Abril'; break;
      case '05': month = 'Mayo'; break;
      case '06': month = 'Junio'; break;
      case '07': month = 'Julio'; break;
      case '08': month = 'Agosto'; break;
      case '09': month = 'Septiembre'; break;
      case '10': month = 'Octubre'; break;
      case '11': month = 'Noviembre'; break;
      case '12': month = 'Diciembre'; break;
    }
    return `${day}-${month}-${year}`;
  }

  onFiltrar() {
    if(this.filtro === false) {
      this.filtro = true;
    } else {
      this.filtro = false;
    }
  }

  openDetalle(perro){
    this.modal.create({
      component: DetalleEncontradoComponent,
      componentProps: {
        perro
      }

    }).then((modal) => modal.present());

  }

  updateLikes(perro) {

  }

  compartir() {

  }

}
