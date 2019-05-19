import { FormsModule } from '@angular/forms';
// Firebase
import { FIREBASE_CONFIG } from './firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import { DetallePerdidoComponent } from './perdidos/detalle-perdido/detalle-perdido.component';
import { DetalleEncontradoComponent } from './encontrados/detalle-encontrado/detalle-encontrado.component';

@NgModule({
  declarations: [AppComponent, DetallePerdidoComponent, DetalleEncontradoComponent],
  entryComponents: [DetallePerdidoComponent, DetalleEncontradoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
  AngularFireModule.initializeApp(FIREBASE_CONFIG),
  AngularFireAuthModule, AngularFirestoreModule, FormsModule],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
