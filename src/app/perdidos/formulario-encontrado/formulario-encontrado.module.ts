
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormularioEncontradoPage } from './formulario-encontrado.page';
import { ComponentesModule } from '../componentes/componentes.module';

const routes: Routes = [
  {
    path: '',
    component: FormularioEncontradoPage
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
  declarations: [FormularioEncontradoPage]
})
export class FormularioEncontradoPageModule {}
