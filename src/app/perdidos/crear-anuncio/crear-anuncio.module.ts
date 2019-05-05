import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearAnuncioPage } from './crear-anuncio.page';
import { ComponentesModule } from '../componentes/componentes.module';


const routes: Routes = [
  {
    path: '',
    component: CrearAnuncioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrearAnuncioPage]
})
export class CrearAnuncioPageModule {}
