import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escoger-tipo-encontrado',
  templateUrl: './escoger-tipo-encontrado.component.html',
  styleUrls: ['./escoger-tipo-encontrado.component.scss'],
})
export class EscogerTipoEncontradoComponent implements OnInit {
  perro: any;
  constructor(private modal: ModalController, private params: NavParams,
              private router: Router) { }

  ngOnInit() {
    this.perro = this.params.get('perro');
  }

  closeModal() {
    this.modal.dismiss();
  }

  onLoVi() {
    console.log('Lo vi');
    this.modal.dismiss();
    this.router.navigateByUrl('/formulario-encontrado');
  }

  onEnMiCasa() {
    console.log('en mi casa');
    this.modal.dismiss();
    this.router.navigateByUrl('/formulario-resguardado');
  }

}
