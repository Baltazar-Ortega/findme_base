import { MapModalAnuncioComponent } from './../map-modal-anuncio/map-modal-anuncio.component';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-location-picker-anuncio',
  templateUrl: './location-picker-anuncio.component.html',
  styleUrls: ['./location-picker-anuncio.component.scss'],
})
export class LocationPickerAnuncioComponent implements OnInit {
  @Output() locationPick = new EventEmitter(); 
  selectedLocationImage: string;
  isLoading = false;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  ngOnInit() {} 

  
  onPickLocation() {
    console.log('onPickLocation');
    this.openMap();
  }
  
  openMap() {
    this.modalCtrl.create({ component: MapModalAnuncioComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if(!modalData){
          return;
        }
        this.isLoading = true;
        console.log(modalData);
        this.isLoading = false;
      });
      modalEl.present();
    });
  }

} 
