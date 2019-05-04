import { PerrosPerdidosService } from './../../servicios/perros-perdidos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
      location: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null)
    });
  }

  onLocationPicked(locationInfo: any) {
    console.log('locationInfo', locationInfo);
    this.form.patchValue({ location: locationInfo });
    console.log('validez del formulario', this.form.valid);
  }

  onImagePicked(imageData: string | File) {
    console.log('Enters onImagePicked');
    console.log(typeof ImageData);
    let imageFile;
    if(typeof imageData === 'string'){
      console.log('Its a string');
      imageFile = base64toBlob(
        imageData.replace('data:image/jpeg;base64,', ''),
        'image/jpeg'
      );
    }
    console.log('FILE READY');
    imageFile = imageData;
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
      this.servicioPerdidos
        .uploadImage(this.form.get('image').value)
        .pipe(
          switchMap(uploadRes => {
            console.log('Agregando anuncio...');
            const anuncio: Anuncio = new Anuncio(
              this.form.controls.nombrePerro.value,
              this.form.controls.raza.value,
              this.form.controls.descripcion.value,
              this.form.controls.fechaPerdido.value,
              this.form.get('location').value,
              uploadRes.imageUrl
            );
            return this.servicioPerdidos.agregarAnuncio(anuncio)
          })
        )
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigateByUrl('/dashboard-perdido');
        });
    });
  }

}
