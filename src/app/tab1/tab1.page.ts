import { FelicidadesResguardadoComponent } from './../encontrados/felicidades-resguardado/felicidades-resguardado.component';
import { EscogerTipoEncontradoComponent } from './../encontrados/escoger-tipo-encontrado/escoger-tipo-encontrado.component';
import { FelicidadesEncontradoComponent } from './../encontrados/felicidades-encontrado/felicidades-encontrado.component';
import { MensajesEncontradosService } from './../servicios/mensajes-encontrados.service';
import { DetallePerdidoComponent } from './../perdidos/detalle-perdido/detalle-perdido.component';
import { AuthService } from './../servicios/auth.service';
import { ModalController } from '@ionic/angular';
import { strict } from 'assert';
import { PerrosPerdidosService } from '../servicios/perros-perdidos.service';
import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LoEncontreService } from '../servicios/lo-encontre.service';
import { MensajesResguardadosService } from '../servicios/mensajes-resguardados.service';
import { Likes } from '../perdidos/componentes/likes.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  selectKm: any = 'all';
  filtro = false;
  listaPerros: any;
  listaLista = false;
  mensajesEncontrados: any;
  mensajesResguardados: any;
  siHayEncontrados = false;
  siHayResguardados = false;
  actualUser: any;

  constructor(private perrosPerdidosServicio: PerrosPerdidosService, private authService: AuthService, public modal: ModalController,
              private router: Router,
              private route: ActivatedRoute,
              private loEncontre: LoEncontreService,
              private msgEncontradosService: MensajesEncontradosService,
              private msgResguardadosService: MensajesResguardadosService) {
                this.route.params.subscribe((data) => {
                  console.log('CONSTRUCTOR');
                  this.obtenerAnuncios(false);
                });
              }

// tslint:disable-next-line: use-life-cycle-interface
  

  ngOnInit() {
    this.siHayEncontrados = false;
    this.siHayResguardados = false;
    console.log('ngOnInit');
    this.obtenerAnuncios(true);
  }

  ionViewWillEnter() {
    console.log('ion view will enter');
    // this.obtenerAnuncios();
  }

  getEstadoMisAnuncios() {
    // Recorrer mensajes-encontrados y checar si está mi id en duenoId de algun mensaje
    this.msgEncontradosService.getMensajesEncontrados().subscribe(res => {
      this.mensajesEncontrados = res;
      console.log('mensajesEncontrados', this.mensajesEncontrados);
      this.authService.getActualUser().then(actualUser => {
        // Obtener el array de los mensajes
        const misMensajesRecibidos: Array<any> = this.mensajesEncontrados.filter(mensaje => mensaje.duenoId === (actualUser as any).key);
        console.log('Mis mensajes recibidos', misMensajesRecibidos);
        if (misMensajesRecibidos.length > 0) {
          this.siHayEncontrados = true;
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

  getEstadoMisAnunciosResguardados() {
    // Recorrer mensajes-resguardados y checar si está mi id en duenoId de algun mensaje
    this.msgResguardadosService.getMensajesResguardados().subscribe(res => {
      this.mensajesResguardados = res;
      console.log('mensajesResguardados', this.mensajesResguardados);
      this.authService.getActualUser().then(actualUser => {
        // Obtener el array de los mensajes
        const misMensajesRecibidos: Array<any> = this.mensajesResguardados.filter(mensaje => mensaje.duenoId === (actualUser as any).key);
        console.log('Mis mensajes recibidos resguardados', misMensajesRecibidos);
        if (misMensajesRecibidos.length > 0) {
          this.siHayResguardados = true;
          // Mostrar un modal con el mensaje (irse de uno en uno)
          // Ese modal contiene info del perro y del rescatista
          // Le mando el actualUser y cada mensaje. Y obtengo la informacion del perro y el rescatista desde ese componente
          console.log('primer mensaje', misMensajesRecibidos[0]);
          for (let i = 0; i < misMensajesRecibidos.length; i++) {
            this.modal.create({
              component: FelicidadesResguardadoComponent,
              componentProps: {
                actualUser,
                mensaje: misMensajesRecibidos[i]
              }
            }).then((modal) => modal.present());
            console.log('Control del for, valor de i = ', i);
          }
        } else {
          console.log('No han resguardado a tus perros o no tienes anuncios');
        }
      }); // Fin del then de getActualUser
    }); // Fin de suscripcion de mensajes-encontrados
  }

  obtenerAnuncios(mostrarModal: boolean) {
    if (mostrarModal) {
      this.getEstadoMisAnuncios();
      this.getEstadoMisAnunciosResguardados();
    }
    const filtroValue = this.selectKm;
    this.perrosPerdidosServicio.obtenerAnuncios(filtroValue).subscribe(datos => {
      console.log('Datos traidos del servicio', datos);
      this.perrosPerdidosServicio.todosPerrosPerdidos = datos;
      // segun el filtro
      this.listaPerros = this.perrosPerdidosServicio.todosPerrosPerdidos;
      console.log('MI LISTA DE PERROS', this.listaPerros);
      this.authService.getActualUser().then(actualUser => {
        this.actualUser = actualUser;
      });
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

  updateLikes(event, anuncio: any, id: any, users: any){
    if (this.alreadyLiked(users)) {
      console.log('Ya le dió like');
      return;
    }
    event.srcElement.classList.add('icono-corazon-rojo');
    console.log('Update likes');
    this.authService.getActualUser().then(actualUser => {
      let idActualUser = (actualUser as any).key;
      let arrayUsers = anuncio.likes.users;
      arrayUsers.push(idActualUser);
      let newNumber = anuncio.likes.number + 1;
      event.srcElement.innerText = `${newNumber} ❤️`;
      let likes: Likes = {
        number: newNumber,
        users: arrayUsers
      };
      console.log('Nuevo objeto likes', likes);
      this.perrosPerdidosServicio.updateLikes(id, likes).subscribe(res => {
        console.log('cambios likes', res);
      })
    });
  }

  alreadyLiked(users: any): boolean {
    return users.includes(this.actualUser.key);
  }

  compartir() {

  }

  onLoEncontre(perro) {
    this.loEncontre.setPerroSeleccionado(perro);
    this.modal.create({
      component: EscogerTipoEncontradoComponent,
      componentProps: {
        perro
      }
    }).then((modal) => modal.present());
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

  /*
  goFormularioEncontrado(perro) {
    this.loEncontre.setPerroSeleccionado(perro);
    this.router.navigateByUrl('/formulario-encontrado');
  }*/

}