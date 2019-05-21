import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { IonicModule } from '@ionic/angular';

import { FormularioResguardadoPage } from './formulario-resguardado.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioResguardadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ComponentesModule
  ],
  declarations: [FormularioResguardadoPage]
})
export class FormularioResguardadoPageModule {}
