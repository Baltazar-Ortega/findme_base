import { PerrosPerdidosService } from './../../servicios/perros-perdidos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Anuncio } from './anuncio.model';
import { PlaceLocation } from '../componentes/location.model';

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.page.html',
  styleUrls: ['./crear-anuncio.page.scss'],
})
export class CrearAnuncioPage implements OnInit {

  form: FormGroup;
  checkValidado = false;

  constructor(private router: Router,
              private loadingCtrl: LoadingController,
              private servicioPerdidos: PerrosPerdidosService) { }

  ngOnInit() {
    this.form = new FormGroup({
      nombrePerro: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      raza: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      descripcion: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      fechaPerdido: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {validators: [Validators.required]})
    });
  }

  onLocationPicked(locationInfo: any) {
    console.log('locationInfo', locationInfo);
    this.form.patchValue({ location: locationInfo });
    console.log('validez del formulario', this.form.valid);
  }

  onCrearAnuncio() {
    if (!this.form.valid) {
      return;
    }
    this.checkValidado = true;
    this.loadingCtrl.create({message: 'Creando anuncio...'})
    .then(loadingEl => {
      loadingEl.present();
      console.log('Agregando anuncio...');
      const anuncio: Anuncio = new Anuncio(
        this.form.controls.nombrePerro.value,
        this.form.controls.raza.value,
        this.form.controls.descripcion.value,
        this.form.controls.fechaPerdido.value,
        this.form.get('location').value 
      );
      this.servicioPerdidos.agregarAnuncio(anuncio)
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/dashboard-perdido');
      });
    });
  }

}
