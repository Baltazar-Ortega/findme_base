import { AuthService } from './../../servicios/auth.service';
import { PerrosPerdidosService } from './../../servicios/perros-perdidos.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-felicidades-resguardado',
  templateUrl: './felicidades-resguardado.component.html',
  styleUrls: ['./felicidades-resguardado.component.scss'],
})
export class FelicidadesResguardadoComponent implements OnInit {
  usuarioActual;
  mensaje: any;
  perro: any;
  rescatador: any;

  constructor(private params: NavParams, private modal: ModalController, private perdidosService: PerrosPerdidosService, private authService: AuthService) { }

  ngOnInit() {
    this.usuarioActual = this.params.get('actualUser');
    this.mensaje = this.params.get('mensaje');

    this.getInfoRescatadorPerro();
  }

  closeDetalle() {
    this.modal.dismiss();
  }

  getInfoRescatadorPerro() {
    const rescatadorId = this.mensaje.rescatadorId;
    let rescatador = null;
    const perroId = this.mensaje.perroId;
    const perro = this.perdidosService.obtenerPerro(perroId);
    console.log('perro del modal', perro);
    this.perro = perro;
    this.authService.getUsers().subscribe(usuarios => {
      usuarios.forEach(user => {
        if (rescatadorId === user.key) {
          rescatador = user;
          console.log('rescatador del modal', rescatador);
          this.rescatador = rescatador;
        }
      });
    });
  }

}
