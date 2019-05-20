import { AuthService } from './../../servicios/auth.service';
import { PerrosPerdidosService } from './../../servicios/perros-perdidos.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-felicidades-encontrado',
  templateUrl: './felicidades-encontrado.component.html',
  styleUrls: ['./felicidades-encontrado.component.scss'],
})
export class FelicidadesEncontradoComponent implements OnInit {
  usuarioActual;
  mensaje: any;
  perro: any;
  observador: any;

  constructor(private params: NavParams, private modal: ModalController, private perdidosService: PerrosPerdidosService, private authService: AuthService) { }

  ngOnInit() {
    this.usuarioActual = this.params.get('actualUser');
    this.mensaje = this.params.get('mensaje');

    this.getInfoObservadorPerro();
  }

  closeDetalle() {
    this.modal.dismiss();
  }

  getInfoObservadorPerro() {
    const observadorId = this.mensaje.observadorId;
    let observador = null;
    const perroId = this.mensaje.perroId;
    const perro = this.perdidosService.obtenerPerro(perroId);
    console.log('perro del modal', perro);
    this.perro = perro;
    this.authService.getUsers().subscribe(usuarios => {
      usuarios.forEach(user => {
        if (observadorId === user.key) {
          observador = user;
          console.log('observador del modal', observador);
          this.observador = observador;
        }
      });
    });
  }

}
