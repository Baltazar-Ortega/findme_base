import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public inputVal:string;
  public titulo:string;
  public t:string;

  public titulo2:string;
  public f:string;

  public titulo3:string;
  public d:string;

  constructor() { 
    this.titulo = "Introduzca numero telefonico";
    this.titulo2 = "Introduzca nombre en Facebook";
    this.titulo3 = "Introduzca los detalles";
  }

  buttonClick(telefono: string){
    alert(telefono);
    this.titulo = telefono;
    this.t = "";
  }

  buttonClick2(facebook: string){
    alert(facebook);
    this.titulo2 = facebook;
    this.f = "";
  }

  buttonClick3(detalles: string){
    alert(detalles);
    this.titulo3 = detalles;
    this.d = "";
  }

  ngOnInit() {
  }

}
