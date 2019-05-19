import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular';

@Component({
  selector: 'app-detalle-perdido',
  templateUrl: './detalle-perdido.component.html',
  styleUrls: ['./detalle-perdido.component.scss'],
})
export class DetallePerdidoComponent implements OnInit {

  public perro: any;
  public dueno: any;

  constructor(private params: NavParams, private modal: ModalController,
              private authService: AuthService) { }

  ngOnInit() {
    this.perro = this.params.get('perro');
    this.getDuenoDelPerro();
  }

  closeDetalle(){
    this.modal.dismiss();
  }

  getDuenoDelPerro() {
    let dueno: any;
    this.authService.getUsers().subscribe(usuarios => {
      usuarios.forEach(usuario => {
        console.log('usuario.key', usuario.key);
        console.log('perro.duenoId', this.perro.duenoId);
        if (usuario.key === this.perro.duenoId) {
          console.log('SI son iguales ids de dueño');
          console.log('DUEÑO', usuario);
          dueno = usuario;
        }
      });
      this.dueno = dueno;
      console.log('this.dueno', this.dueno);
    });
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
