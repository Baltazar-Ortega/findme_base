import { DetallePerdidoComponent } from './../perdidos/detalle-perdido/detalle-perdido.component';
import { AuthService } from './../servicios/auth.service';
import { ModalController } from '@ionic/angular';
import { strict } from 'assert';
import { PerrosPerdidosService } from '../servicios/perros-perdidos.service';
import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { LoEncontreService } from '../servicios/lo-encontre.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectKm: any = 'all';
  filtro = false;
  listaPerros: any;
  listaLista = false;

  constructor(private perrosPerdidosServicio: PerrosPerdidosService, public authService: AuthService, public modal: ModalController,
              private router: Router,
              private loEncontre: LoEncontreService ) {}

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.obtenerAnuncios();
  }

  obtenerAnuncios() {
    const filtroValue = this.selectKm;
    this.perrosPerdidosServicio.obtenerAnuncios(filtroValue).subscribe(datos => {
      console.log('Datos traidos del servicio', datos);
      this.perrosPerdidosServicio.todosPerrosPerdidos = datos;
      // segun el filtro
      this.listaPerros = this.perrosPerdidosServicio.todosPerrosPerdidos;
      console.log('MI LISTA DE PERROS', this.listaPerros);
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

  onFiltrar() {
    if(this.filtro === false) {
      this.filtro = true;
    } else {
      this.filtro = false;
    }
  }

  openDetalle(perro) {
    this.modal.create({
      component: DetallePerdidoComponent,
      componentProps: {
        perro
      }
    }).then((modal) => modal.present());
  }

  updateLikes(anuncion: any, id: any){
    this.perrosPerdidosServicio.updateLikes(anuncion, id);
  }

  compartir() {

  }

  onLogout() {
    this.authService.logout();
  }

  goFormularioEncontrado(perro) {
    this.loEncontre.setPerroSeleccionado(perro);
    this.router.navigateByUrl('/formulario-encontrado');
  }

}
