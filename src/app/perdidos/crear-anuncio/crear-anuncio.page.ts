import { AuthService } from './../../servicios/auth.service';
import { PerrosPerdidosService } from './../../servicios/perros-perdidos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Anuncio } from './anuncio.model';
import { switchMap } from 'rxjs/operators';


function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.page.html',
  styleUrls: ['./crear-anuncio.page.scss'],
})
export class CrearAnuncioPage implements OnInit {

  form: FormGroup;
  checkValidado = false;
  usuarioActual: any = null;

  constructor(private router: Router,
              private loadingCtrl: LoadingController,
              private servicioPerdidos: PerrosPerdidosService,
              private authService: AuthService,
              private navCtrl: NavController) { }

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
      location: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null)
    });
    this.obtenerUsuarioActual();
  }

  obtenerUsuarioActual() {
    this.authService.getActualUser().then(userActual => {
      this.usuarioActual = userActual;
    });
  }

  onLocationPicked(locationInfo: any) {
    console.log('locationInfo', locationInfo);
    this.form.patchValue({ location: locationInfo });
    console.log('validez del formulario', this.form.valid);
  }

  onImagePicked(imageData: string) {
    console.log('Enters onImagePicked');
    let imageFile = imageData;
    console.log('String de imagen', imageFile);
    this.form.patchValue({ image: imageFile });
  }

  onCrearAnuncio() {
    if (!this.form.valid || !this.form.get('image').value) {
      return;
    }
    this.checkValidado = true;
    this.loadingCtrl.create({message: 'Creando anuncio...'})
    .then(loadingEl => {
      loadingEl.present();
      console.log('image value', this.form.get('image').value);
      if (typeof this.form.get('image').value !== 'string') {
        console.log('NO ES UN STRING');
        this.servicioPerdidos.uploadImage(this.form.get('image').value).pipe(switchMap(uploadRes => {
          console.log('Agregando anuncio...');
          console.log(uploadRes);
          const anuncioASubir: Anuncio = new Anuncio(
                this.form.controls.nombrePerro.value,
                this.form.controls.raza.value,
                this.form.controls.descripcion.value,
                this.form.controls.fechaPerdido.value,
                true,
                this.usuarioActual.key,
                this.form.get('location').value,
                (uploadRes as any).imageUrl
             );
          console.log('anuncio', anuncioASubir);
          return this.servicioPerdidos.agregarAnuncio(anuncioASubir);
        })).subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigateByUrl('/dashboard-perdido');
        });
      } else {
        this.servicioPerdidos.uploadImage(this.form.get('image').value);
        console.log('Agregando anuncio...');
        const anuncio: Anuncio = new Anuncio(
              this.form.controls.nombrePerro.value,
              this.form.controls.raza.value,
              this.form.controls.descripcion.value,
               this.form.controls.fechaPerdido.value,
               true,
               this.usuarioActual.key,
              this.form.get('location').value,
              this.form.get('image').value
          );
        console.log('anuncio', anuncio);
        this.servicioPerdidos.agregarAnuncio(anuncio).subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.navCtrl.navigateBack('/dashboard-perdido');
            // this.router.navigateByUrl('/dashboard-perdido');
        });
      }
    });
  }

}
