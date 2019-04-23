import { PerrosEncontradosService } from './../../servicios/perros-encontrados.service';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Encontrado } from './encontrado.model';
import { PlaceLocation } from '../componentes/location.model';

@Component({
  selector: 'app-formulario-encontrado',
  templateUrl: './formulario-encontrado.page.html',
  styleUrls: ['./formulario-encontrado.page.scss'],
})
export class FormularioEncontradoPage implements OnInit {

  form: FormGroup;
  checkValidado = false;

  constructor(
    private loadingCtrl: LoadingController,
    private encontradosService: PerrosEncontradosService) { }

  ngOnInit() {
    this.form = new FormGroup({
      mensaje: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      fechaEncontrado: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, { validators: [Validators.required]})
    });
  }

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  onCrearAnuncioEncontrado() {
    if (!this.form.valid) {
      return;
    }
    this.checkValidado = true;
    this.loadingCtrl.create({ message: 'Mandando mensaje...' })
      .then(loadingEl => {
        loadingEl.present();
        console.log('Agregando anuncio...');
        const encontrado: Encontrado = new Encontrado(
          this.form.controls.fechaEncontrado.value,
          this.form.controls.mensaje.value,
          this.form.get('location').value
        );
        this.encontradosService.mandarAnuncioEncontrado(encontrado)
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
          });
      });
  }

}
