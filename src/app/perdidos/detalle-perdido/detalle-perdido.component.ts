import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular';

@Component({
  selector: 'app-detalle-perdido',
  templateUrl: './detalle-perdido.component.html',
  styleUrls: ['./detalle-perdido.component.scss'],
})
export class DetallePerdidoComponent implements OnInit {

  public perro: any;


  constructor(private params: NavParams, private modal: ModalController) { }

  ngOnInit() {
    this.perro=this.params.get('perro');

  }
  closeDetalle(){
    this.modal.dismiss();
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
