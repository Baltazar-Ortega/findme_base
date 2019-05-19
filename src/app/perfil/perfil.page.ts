import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuarioActual: any;
  form: FormGroup;
  anuncios = false;
  constructor(private authService: AuthService) {
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
    });
  }


}
