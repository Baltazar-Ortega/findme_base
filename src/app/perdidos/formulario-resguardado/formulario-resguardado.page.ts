import { AuthService } from './../../servicios/auth.service';
import { PerrosResguardadosService } from './../../servicios/perros-resguardados.service';
import { Resguardado } from './resguardado.model';
import { LoEncontreService } from './../../servicios/lo-encontre.service';
import { Router, ChildActivationEnd, ActivatedRoute } from '@angular/router';
import { PerrosEncontradosService } from './../../servicios/perros-encontrados.service';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-resguardado',
  templateUrl: './formulario-resguardado.page.html',
  styleUrls: ['./formulario-resguardado.page.scss'],
})
export class FormularioResguardadoPage implements OnInit {
  form: FormGroup;
  checkValidado = false;
  perro: any;
  actualUser: any;
  duenoId: any;

  constructor(private loadingCtrl: LoadingController,
              private resguardadosService: PerrosResguardadosService,
              private router: Router,
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
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.getDuenoYActualUserIds();
  }

  getDuenoYActualUserIds() {
    this.authService.getActualUser().then(actualUser => {
      this.actualUser = actualUser;
      this.duenoId = this.perro.duenoId;
    });
  }

  onImagePicked(imageData: string) {
    console.log('Enters onImagePicked');
    const imageFile = imageData;
    console.log('String de imagen', imageFile);
    this.form.patchValue({ image: imageFile });
  }

  onCrearAnuncioResguardado() {
    if (!this.form.valid) {
      return;
    }
    this.checkValidado = true;
    this.loadingCtrl.create({ message: 'Mensaje enviado' })
      .then(loadingEl => {
        loadingEl.present();
        console.log('image value', this.form.get('image').value);

        if (typeof this.form.get('image').value !== 'string') {
          console.log('NO ES UN STRING');
          this.resguardadosService.uploadImage(this.form.get('image').value).pipe(switchMap(uploadRes => {
            console.log('Agregando anuncio...');
            const resguardadoASubir: Resguardado = new Resguardado(
              this.form.controls.fechaEncontrado.value,
              this.form.controls.mensaje.value,
              this.duenoId,
              this.actualUser.key,
              this.perro.key,
              (uploadRes as any).imageUrl
            );
            return this.resguardadosService.mandarAnuncioResguardado(resguardadoASubir)
          })).subscribe(() => {
            this.router.navigateByUrl('/dashboard-encontrado');
            loadingEl.dismiss();
            this.form.reset();
            this.form.value.image = null;
          })
        } else {
          this.resguardadosService.uploadImage(this.form.get('image').value);
          console.log('Agregando anuncio...');
          const resguardado: Resguardado = new Resguardado(
            this.form.controls.fechaEncontrado.value,
            this.form.controls.mensaje.value,
            this.duenoId,
            this.actualUser.key,
            this.perro.key,
            this.form.get('image').value
          );
          this.resguardadosService.mandarAnuncioResguardado(resguardado)
            .subscribe(() => {
              this.router.navigateByUrl('/dashboard-encontrado'); 
              loadingEl.dismiss();
              this.form.reset();
              this.form.value.image = null;
            });
        } // Fin del else

      }); // Fin del then
  }

}
