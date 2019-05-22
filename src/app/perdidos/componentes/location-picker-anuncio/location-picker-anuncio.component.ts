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
  googleMaps: any;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  ngOnInit() {} 

  
  onPickLocation() {
    this.openMap();
  } 
  
  openMap() {
    /*Plugins.Geolocation.getCurrentPosition().then(geoPosition => {
      this.centroCoordenadas = { lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude };
    });*/
    this.modalCtrl.create({ component: MapModalAnuncioComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if(!modalData.data){
          console.log('No hay data enviada desde el modal');
          return;
        }
        const arrayLatLng = modalData.data;
        console.log('modalData', arrayLatLng);
        this.centroPoligono(arrayLatLng).then(centro => {
          this.isLoading = true;
          this.centroCoordenadas = {lat: (centro as any).lat, lng: (centro as any).lng};
          this.imagenGenerada = this.getMapImage(this.centroCoordenadas, arrayLatLng, 14);
          console.log('Data enviada desde el modal', modalData);
          let poligonoInfoCompleta = {
            array: arrayLatLng,
            imagen: this.imagenGenerada,
          };
          this.isLoading = false;
          this.locationPick.emit(poligonoInfoCompleta);
        }); // Fin promesa centro poligono
      }); 
      modalEl.present();
    });
  }

  centroPoligono(arrayLatLng: any) {
    return new Promise((resolve, rejected) => {
      this.getGoogleMaps().then(googleMaps => {
        this.googleMaps = googleMaps;
        let bounds = new this.googleMaps.LatLngBounds();
        let i;
  
        let arrayObjLatLng: Array<any> = [];
        arrayLatLng.forEach(coord => {
          arrayObjLatLng.push(new this.googleMaps.LatLng(coord.lat, coord.lng));
        });
        console.log('array de objetos LatLng', arrayObjLatLng);
        for (i = 0; i < arrayObjLatLng.length; i++) {
          bounds.extend(arrayObjLatLng[i]);
        }
        let centroBound = bounds.getCenter();
        let centro = {lat: centroBound.lat(), lng: centroBound.lng()};
        console.log('Centro correcto', centro);
        resolve(centro);
      });
    });
  }

  private getMapImage(centro, array, zoom) {
    let stringImagen =  `https://maps.googleapis.com/maps/api/staticmap?center=${centro.lat},${centro.lng}&zoom=${zoom}&size=500x300&maptype=roadmap&path=color:red|weight:5|fillcolor:red`;
    let stringKey = `&key=${environment.googleMapsAPIKey}`;
    let stringPrimerasCoordenadas: string;
    array.forEach((el, index) => {
      let stringCoordenadas = `|${el.lat},${el.lng}`;
      if(index === 0) {
        stringPrimerasCoordenadas = stringCoordenadas;
      }
      stringImagen += stringCoordenadas;
    });
    stringImagen += stringPrimerasCoordenadas;
    stringImagen += `&markers=color:red`;
    array.forEach((el, index) => {
      let stringCoordenadas = `|${el.lat},${el.lng}`;
      stringImagen += stringCoordenadas;
    });
    stringImagen += stringKey;
    console.log(stringImagen);
    return stringImagen;
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any; // window es el browser window
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      // no cargo el sdk otra vez
      return Promise.resolve(googleModule.maps);
    }
    // No ha sido cargado el sdk
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIKey + '&libraries=geometry';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available');
        }
      };
    })
  }

} 
