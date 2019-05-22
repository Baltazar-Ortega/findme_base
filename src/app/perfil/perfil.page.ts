import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Anuncio } from './../perdidos/crear-anuncio/anuncio.model';
import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PerrosPerdidosService } from '../servicios/perros-perdidos.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuarioActual: any;
  form: FormGroup;
  anuncios = false;
  mensajeCambios: string = 'Guardar cambios';
  anunciosUsuarioActual: any;

  constructor(private authService: AuthService, private perdidosService: PerrosPerdidosService, public alertCtrl: AlertController, private router: Router) {
  }

  ngOnInit() {
    this.obtenerUsuario();
    this.form = new FormGroup({
      nombreUsuario: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      })
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  obtenerUsuario() {
    this.authService.getActualUser().then(usuarioActual => {
      this.usuarioActual = usuarioActual;
      this.obtenerAnuncios();
    });
  }

  obtenerAnuncios() {
    console.log('Si entré a obtenerAnuncios()', this.usuarioActual);
    this.anunciosUsuarioActual = this.perdidosService.obtenerAnuncio(this.usuarioActual.key);
    console.log('anuncios usuario actual', this.anunciosUsuarioActual);
  }

  guardarCambios() {
    this.usuarioActual.email = this.form.get('email').value;
    this.usuarioActual.nombreUsuario = this.form.get('nombreUsuario').value;
    this.authService.updateUser(this.usuarioActual);
    this.mensajeCambios = 'Cambios guardados';
  }

  updateEstadoAnuncioAlert(key: string, anuncio: Anuncio) {
    console.log('Entra a update Estado anuncio, ya se tiene al perro');
    this.alertUpdateAnuncio(key, anuncio);
  }

  async alertUpdateAnuncio(key: string, anuncio: Anuncio) {
    const alert = await this.alertCtrl.create({
      header: 'Gracias por usar findme',
      message: 'Ahora tu perro aparecerá en la seccion de encontrados',
      buttons: [{
                  text: 'Cancelar',
                  role: 'cancel'
                },
                {
                  text: 'OK',
                  handler: () => {
                    console.log('Confirm upadte');
                    this.updateEstadoAnuncio(key, anuncio);
                  }
                }]
    });
    await alert.present();
  }

  updateEstadoAnuncio(key: string, anuncio: Anuncio) {
    console.log('Entra a updateEstadoAnuncio');
    this.perdidosService.updateEstadoAnuncio(key, anuncio).subscribe(res => {
      console.log('respuesta update estado', res);
      this.router.navigate(['/dashboard-encontrado']);
    })
  }

  eliminarAnuncioAlert(key: string) {
    console.log('entra a eliminar anuncio');
    this.alertBorrarAnuncio(key);
  }

  async alertBorrarAnuncio(key: string) {
    const alert = await this.alertCtrl.create({
      header: '¿Estas seguro?',
      message: 'Tu anuncio desaparecerá',
      buttons: [{
                  text: 'Cancelar',
                  role: 'cancel'
                },
                {
                  text: 'Ok',
                  handler: () => {
                    console.log('Confirm okay');
                    this.eliminarAnuncio(key);
                  }
                }]
    });
    await alert.present();
  }

  eliminarAnuncio(key: string) {
    console.log('Entra a eliminarAnuncio');
    this.perdidosService.borrarAnuncio(key).subscribe(res => {
      console.log('Respuesta del borrar', res);
      this.router.navigate(['/dashboard-perdido']);
    })
  }

  private formatoFecha(fecha: Date) {
    let month = String(fecha.getMonth() + 1);
    let day = String(fecha.getDate());
    const year = String(fecha.getFullYear());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    switch(month){
      case '01': month = 'Enero'; break;
      case '02': month = 'Febrero'; break;
      case '03': month = 'Marzo' ; break;
      case '04': month = 'Abril'; break;
      case '05': month = 'Mayo'; break;
      case '06': month = 'Junio'; break;
      case '07': month = 'Julio'; break;
      case '08': month = 'Agosto'; break;
      case '09': month = 'Septiembre'; break;
      case '10': month = 'Octubre'; break;
      case '11': month = 'Noviembre'; break;
      case '12': month = 'Diciembre'; break;
    }
    return `${day}-${month}-${year}`;
  }

  onLogout() {
    this.authService.logout();
  }

  


}
