import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public email: string = null;
  public password: string = null;
  public nombreUsuario: string = null;
  public telefono: string = null;

  constructor(private auth: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onSubmitRegister() {
    this.auth.register(this.email, this.password, this.nombreUsuario, this.telefono).then(auth => {
      this.router.navigate(['/']);
      console.log(auth); // Aqui se pueden manejar las validaciones
    }).catch(err => {
      console.log(err);
      this.presentAlert(err);
    });
  }

  async presentAlert(err) {
    let message = 'Ingresa otros datos';
    console.log(this.password);
    if (!this.password) {
       message = 'Establece una contraseña';
    }
    if (!this.email) {
      message = 'Establece un email';
    }
    if (!this.telefono) {
      message = 'Establece un telefono';
    }
    if (!this.nombreUsuario) {
      message = 'Establece un nombre de usuario';
    }
    if (err.code === 'auth/email-already-in-use') {
      message = 'El email introducido ya está en uso';
    } else if (err.code === 'auth/invalid-email') {
      message = 'El formato del email es incorrecto';
    }
    const alert = await this.alertCtrl.create({
      header: 'Algo salió mal...',
      message,
      buttons: ['Ok']
    });
    alert.present();
  }

}
