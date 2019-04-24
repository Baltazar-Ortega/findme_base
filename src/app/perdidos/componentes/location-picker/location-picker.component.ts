import { Coordinates } from './../location.model';
import { MapModalComponent } from './../map-modal/map-modal.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { PlaceLocation } from '../location.model';
import { environment } from '../../../../environments/environment';
import { Plugins, Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string;
  isLoading = false;

  constructor(private modalCtrl: ModalController, 
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  onPickLocation() { 
    // Pregunto si se quiere autolocalizar
    this.actionSheetCtrl.create({header: 'Please Choose', buttons: [
        {text: 'Tomar mi ubicacion', handler: () => {
          this.locateUser();
        }},
        {text: 'Escoger en el mapa', handler: () => {
          this.openMap();
        }},
        {text: 'Cancelar', role: 'cancel'}
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  private locateUser() {
    this.isLoading = true;
    if (!Capacitor.isPluginAvailable('Geolocation')){
      this.showErrorAlert();
      return;
    }
    console.log('Si tiene localizacion');
    Plugins.Geolocation.getCurrentPosition()
    .then(geoPosition => {
      const coordinates: Coordinates = {lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude};
      const pickedLocation: PlaceLocation = {
        lat: coordinates.lat,
        lng: coordinates.lng,
        staticMapImageUrl: null
      };
      pickedLocation.staticMapImageUrl = this.getMapImage(pickedLocation.lat, pickedLocation.lng, 13);
      this.isLoading = false;
      this.selectedLocationImage = pickedLocation.staticMapImageUrl;
      this.locationPick.emit(pickedLocation);
    })
    .catch(err => {
      this.isLoading = false;
      this.showErrorAlert();
    })
  }

  private showErrorAlert() {
    this.alertCtrl.create({ header: 'No se pudo obtener tu localizacion', message: 'Por favor usa el mapa, selecciona un lugar' })
    .then(alertEl => alertEl.present());
  }

  private openMap() {
    // Abre el modal
    this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => { // Los modals pueden retornar valores
        if (!modalData.data) {
          return;
        }
        const pickedLocation: PlaceLocation = {
          lat: modalData.data.lat,
          lng: modalData.data.lng,
          staticMapImageUrl: null
        };
        pickedLocation.staticMapImageUrl = this.getMapImage(pickedLocation.lat, pickedLocation.lng, 13);
        this.isLoading = true;
        this.selectedLocationImage = pickedLocation.staticMapImageUrl;
        this.isLoading = false;
        this.locationPick.emit(pickedLocation);
        // console.log(modalData.data);  en .data estan los lat y lng
      });
      modalEl.present();
    });
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
&markers=color:red%7Clabel:Place%7C${lat},${lng}
&key=${environment.googleMapsAPIKey}`;
  }

}
