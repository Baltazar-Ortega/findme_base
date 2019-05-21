import { Router } from '@angular/router';
import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public email: string;
  public password: string;
  public nombreUsuario: string;
  public telefono: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitRegister() {
    this.auth.register(this.email, this.password, this.nombreUsuario, this.telefono).then(auth => {
      this.router.navigate(['/']);
      console.log(auth); // Aqui se pueden manejar las validaciones
    }).catch(err => {
      console.log(err);
    });
  }

}
