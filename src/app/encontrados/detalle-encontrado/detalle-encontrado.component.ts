import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-detalle-encontrado',
  templateUrl: './detalle-encontrado.component.html',
  styleUrls: ['./detalle-encontrado.component.scss'],
})
export class DetalleEncontradoComponent implements OnInit {

  public perro: any;
  constructor(private params: NavParams, private modal: ModalController) { }

  ngOnInit() {
    this.perro = this.params.get('perro');

  }

  closeDetalle() {
    this.modal.dismiss();
  }


}
