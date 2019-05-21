import { AuthService } from './../../servicios/auth.service';
import { LoEncontreService } from './../../servicios/lo-encontre.service';
import { Router, ChildActivationEnd, ActivatedRoute } from '@angular/router';
import { PerrosEncontradosService } from './../../servicios/perros-encontrados.service';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Encontrado } from './encontrado.model';
import { PlaceLocation } from '../componentes/location.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-encontrado',
  templateUrl: './formulario-encontrado.page.html',
  styleUrls: ['./formulario-encontrado.page.scss'],
})
export class FormularioEncontradoPage implements OnInit {
  form: FormGroup;
  checkValidado = false;
  perro: any;
  actualUser: any;
  duenoId: any;

  constructor(
    private loadingCtrl: LoadingController,
    private encontradosService: PerrosEncontradosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loEncontre: LoEncontreService,
    private authService: AuthService) { }

  ngOnInit() {
    this.perro = this.loEncontre.getPerroSeleccionado();
    console.log('Perro seleccionado', this.perro);
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
    this.getDuenoYActualUserIds();
  }

  getDuenoYActualUserIds() {
    this.authService.getActualUser().then(actualUser => {
      this.actualUser = actualUser;
      this.duenoId = this.perro.duenoId;
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
    if (!this.form.valid) {
      return;
    }
    this.checkValidado = true;
    this.loadingCtrl.create({ message: 'Mensaje enviado' })
      .then(loadingEl => {
        loadingEl.present();
        console.log('image value', this.form.get('image').value);

        if (!this.form.get('image').value) {
          console.log('Agregando anuncio... con imagen nula');
          const imagen = '';
          const encontrado: Encontrado = new Encontrado(
            this.form.controls.fechaEncontrado.value,
            this.form.controls.mensaje.value,
            this.form.get('location').value,
            this.duenoId,
            this.actualUser.key,
            this.perro.key,
            imagen
          );
          this.encontradosService.mandarAnuncioEncontrado(encontrado)
            .subscribe(() => {
              this.router.navigateByUrl('/dashboard-encontrado'); 
              loadingEl.dismiss();
              this.form.reset();
              this.form.value.image = null;
              this.form.value.location = null;
            });
        } else if (typeof this.form.get('image').value !== 'string') {
            console.log('NO ES UN STRING');
            this.encontradosService.uploadImage(this.form.get('image').value).pipe(switchMap(uploadRes => {
              console.log('Agregando anuncio...');
              const encontradoASubir: Encontrado = new Encontrado(
                this.form.controls.fechaEncontrado.value,
                this.form.controls.mensaje.value,
                this.form.get('location').value,
                this.duenoId,
                this.actualUser.key,
                this.perro.key,
                (uploadRes as any).imageUrl
              );
              return this.encontradosService.mandarAnuncioEncontrado(encontradoASubir)
            })).subscribe(() => {
              this.router.navigateByUrl('/dashboard-encontrado');
              loadingEl.dismiss();
              this.form.reset();
              this.form.value.image = null;
              this.form.value.location = null;
            });
        } else {
          this.encontradosService.uploadImage(this.form.get('image').value);
          console.log('Agregando anuncio...');
          const encontrado: Encontrado = new Encontrado(
            this.form.controls.fechaEncontrado.value,
            this.form.controls.mensaje.value,
            this.form.get('image').value,
            this.duenoId,
            this.actualUser.key,
            this.perro.key,
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
        } // Fin del else

      }); // Fin del then
  }

}
