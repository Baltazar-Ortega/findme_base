import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.authService.login(this.email, this.password).then(res => {
      // Redirigir a tab1
      this.router.navigate(['/dashboard-perdido']);
    }).catch(err => {
      alert('Los datos son incorrectos o no existe el usuario');
    })
  }

}
