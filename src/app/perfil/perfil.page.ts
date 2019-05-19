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

  constructor(private authService: AuthService, private perdidosService: PerrosPerdidosService) {
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
    return `${day}/${month}/${year}`;
  }

  onLogout() {
    this.authService.logout();
  }


}
