import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleEncontradoPage } from './detalle-encontrado.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleEncontradoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleEncontradoPage]
})
export class DetalleEncontradoPageModule {}
