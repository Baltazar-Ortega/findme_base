import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-detalle-encontrado',
  templateUrl: './detalle-encontrado.component.html',
  styleUrls: ['./detalle-encontrado.component.scss'],
})
export class DetalleEncontradoComponent implements OnInit {

  public perro: any;
  constructor(private params: NavParams, private modal: ModalController, private router: Router) { }

  ngOnInit() {
    this.perro = this.params.get('perro');

  }

  closeDetalle() {
    this.modal.dismiss();
  }

  verPerrosPerdidos() {
    
    this.router.navigateByUrl('/dashboard-perdido');
    this.modal.dismiss();
  }


}
