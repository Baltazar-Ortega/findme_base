import { Coordinates } from './../location.model';
import { MapModalAnuncioComponent } from './../map-modal-anuncio/map-modal-anuncio.component';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-location-picker-anuncio',
  templateUrl: './location-picker-anuncio.component.html',
  styleUrls: ['./location-picker-anuncio.component.scss'],
})
export class LocationPickerAnuncioComponent implements OnInit {
  @Output() locationPick = new EventEmitter(); 
  selectedLocationImage: string;
  isLoading = false;
  centroCoordenadas: Coordinates;
  imagenGenerada: string;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  ngOnInit() {} 

  
  onPickLocation() {
    this.openMap();
  }
  
  openMap() {
    Plugins.Geolocation.getCurrentPosition().then(geoPosition => {
      this.centroCoordenadas = { lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude };
    });
    this.modalCtrl.create({ component: MapModalAnuncioComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if(!modalData.data){
          console.log('No hay data enviada desde el modal');
          return;
        }
        const arrayLatLng = modalData.data;
        this.isLoading = true;
        this.imagenGenerada = this.getMapImage(this.centroCoordenadas, arrayLatLng, 15);
        console.log('Data enviada desde el modal', modalData);
        this.isLoading = false;
      }); 
      modalEl.present();
    });
  }

  private getMapImage(centro, array, zoom) {
    let stringImagen =  `https://maps.googleapis.com/maps/api/staticmap?center=${centro.lat},${centro.lng}&zoom=${zoom}&size=500x300&maptype=roadmap&path=color:red|weight:5|fillcolor:red`;
    let stringKey = `&key=${environment.googleMapsAPIKey}`;
    array.forEach(el => {
      let stringCoordenadas = `|${el.lat},${el.lng}`;
      stringImagen += stringCoordenadas;
    });
    stringImagen += stringKey;
    console.log(stringImagen);
    return stringImagen;
  }

} 
