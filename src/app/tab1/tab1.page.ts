import { FelicidadesEncontradoComponent } from './../encontrados/felicidades-encontrado/felicidades-encontrado.component';
import { MensajesEncontradosService } from './../servicios/mensajes-encontrados.service';
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
  mensajesEncontrados: any;
  siHayEncontrados = false;

  constructor(private perrosPerdidosServicio: PerrosPerdidosService, public authService: AuthService, public modal: ModalController,
              private router: Router,
              private loEncontre: LoEncontreService,
              private msgEncontradosService: MensajesEncontradosService ) {}

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.obtenerAnuncios();
  }

  getEstadoMisAnuncios() {
    // Recorrer mensajes-encontrados y checar si está mi id en duenoId de algun mensaje
    this.msgEncontradosService.getMensajesEncontrados().subscribe(res => {
      this.mensajesEncontrados = res;
      console.log('mensajesEncontrados', this.mensajesEncontrados);
      if (this.mensajesEncontrados.length > 0) {
        console.log('Si es mayor a cero');
        this.siHayEncontrados = true;
      }
      this.authService.getActualUser().then(actualUser => {
        // Obtener el array de los mensajes
        const misMensajesRecibidos: Array<any> = this.mensajesEncontrados.filter(mensaje => mensaje.duenoId === (actualUser as any).key);
        console.log('Mis mensajes recibidos', misMensajesRecibidos);
        if (misMensajesRecibidos.length > 0) {
          // Mostrar un modal con el mensaje (irse de uno en uno)
          // Ese modal contiene info del perro y del rescatista
          // Le mando el actualUser y cada mensaje. Y obtengo la informacion del perro y el rescatista desde ese componente
          console.log('primer mensaje', misMensajesRecibidos[0]);
          for (let i = 0; i < misMensajesRecibidos.length; i++) {
            this.modal.create({
              component: FelicidadesEncontradoComponent,
              componentProps: {
                actualUser,
                mensaje: misMensajesRecibidos[i]
              }
            }).then((modal) => modal.present());
            console.log('Control del for, valor de i = ', i);
          }
        } else {
          console.log('No han encontrado a tus perros o no tienes anuncios');
        }
      }); // Fin del then de getActualUser
    }); // Fin de suscripcion de mensajes-encontrados
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
      this.getEstadoMisAnuncios();
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

  

  goFormularioEncontrado(perro) {
    this.loEncontre.setPerroSeleccionado(perro);
    this.router.navigateByUrl('/formulario-encontrado');
  }

}
