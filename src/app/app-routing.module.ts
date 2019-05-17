import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'dashboard-perdido', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'dashboard-encontrado', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'detalle-perro', loadChildren: './perdidos/detalle-perro/detalle-perro.module#DetallePerroPageModule', canActivate: [AuthGuard] },
// tslint:disable-next-line: max-line-length
  { path: 'detalle-encontrado', loadChildren: './encontrados/detalle-encontrado/detalle-encontrado.module#DetalleEncontradoPageModule', canActivate: [AuthGuard] },
  { path: 'crear-anuncio', loadChildren: './perdidos/crear-anuncio/crear-anuncio.module#CrearAnuncioPageModule', canActivate: [AuthGuard] },
// tslint:disable-next-line: max-line-length
  { path: 'formulario-encontrado', loadChildren: './perdidos/formulario-encontrado/formulario-encontrado.module#FormularioEncontradoPageModule', canActivate: [AuthGuard] },
// tslint:disable-next-line: max-line-length
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [NologinGuard] }, // Si estas logueado, ya no puedes entrar ni a login ni registro
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule', canActivate: [NologinGuard] },  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
