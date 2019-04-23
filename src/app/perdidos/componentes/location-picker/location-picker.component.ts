import { MapModalComponent } from './../map-modal/map-modal.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlaceLocation } from '../location.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  selectedLocationImage: string;
  isLoading = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onPickLocation() { // Abre el modal
    this.modalCtrl.create({component: MapModalComponent}).then(modalEl => {
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
