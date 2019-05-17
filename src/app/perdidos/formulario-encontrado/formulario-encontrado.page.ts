import { Router, ChildActivationEnd } from '@angular/router';
import { PerrosEncontradosService } from './../../servicios/perros-encontrados.service';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
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
    private encontradosService: PerrosEncontradosService,
    private router: Router) { }

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
      location: new FormControl(null, { validators: [Validators.required]}),
      image: new FormControl(null)
    });
  }

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  onImagePicked(imageData: string) {
    console.log('Enters onImagePicked');
    const imageFile = imageData;
    console.log('String de imagen', imageFile);
    this.form.patchValue({ image: imageFile });
  }

  onCrearAnuncioEncontrado() {
    if (!this.form.valid || !this.form.get('image').value) {
      return;
    } 
    this.checkValidado = true;
    this.loadingCtrl.create({ message: 'Mensaje enviado' })
      .then(loadingEl => {
        loadingEl.present();
        this.encontradosService.uploadImage(this.form.get('image').value);
        console.log('Agregando anuncio...');
        const encontrado: Encontrado = new Encontrado(
          this.form.controls.fechaEncontrado.value,
          this.form.controls.mensaje.value,
          this.form.get('image').value,
          this.form.get('location').value
        );
        this.encontradosService.mandarAnuncioEncontrado(encontrado)
          .subscribe(() => {
            this.router.navigateByUrl('/dashboard-encontrado'); 
            loadingEl.dismiss();
            this.form.reset();
            this.form.value.image = null;
            this.form.value.location = null;
          });
      });
  }

}
