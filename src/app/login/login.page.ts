import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = null;
  password: string = null;

  constructor(private authService: AuthService, public router: Router, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    if (this.email === '' || this.password === '') {
      console.log('Llena los datos');
      return;
    }
    this.authService.login(this.email, this.password).then(res => {
      // Redirigir a tab1
      this.router.navigate(['/dashboard-perdido']);
    }).catch(err => {
      this.presentarAlert(err);
      // alert('Los datos son incorrectos o no existe el usuario');
    });
  }

  async presentarAlert(err) {
    let message = 'Datos incorrectos';
    console.log(err);
    if (!this.password) {
      message = 'Ingresa una contraseña';
   }
    if (!this.email) {
     message = 'Ingresa un email';
   }
    if(err.code === 'auth/wrong-password') {
      message = 'Contraseña incorrecta';
    } else if (err.code === 'auth/user-not-found') {
      message = 'No existe un usuario con ese email';
    }
    const alert = await this.alertCtrl.create({
      header: 'Algo salió mal...',
      message,
      buttons: ['Ok']
    });
    alert.present();
  }

}
