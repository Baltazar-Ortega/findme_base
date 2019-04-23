import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'dashboard-perdido', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'dashboard-encontrado', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'autenticacion', loadChildren: './autenticacion/autenticacion.module#AutenticacionPageModule' },
  { path: 'detalle-perro', loadChildren: './perdidos/detalle-perro/detalle-perro.module#DetallePerroPageModule' },
  { path: 'miperfil', loadChildren: './perfil/miperfil/miperfil.module#MiperfilPageModule' },
  { path: 'userperfil', loadChildren: './perfil/userperfil/userperfil.module#UserperfilPageModule' },
  { path: 'detalle-encontrado', loadChildren: './encontrados/detalle-encontrado/detalle-encontrado.module#DetalleEncontradoPageModule' },
  { path: 'crear-anuncio', loadChildren: './perdidos/crear-anuncio/crear-anuncio.module#CrearAnuncioPageModule' },
  { path: 'formulario-encontrado', loadChildren: './perdidos/formulario-encontrado/formulario-encontrado.module#FormularioEncontradoPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
