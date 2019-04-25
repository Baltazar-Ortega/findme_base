import { Coordinates } from './../location.model';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { environment  } from '../../../../environments/environment';
import { Plugins, Capacitor } from '@capacitor/core';
import { PlaceLocation } from '../location.model';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map') mapElementRef: ElementRef;
  // Los listeners se guardan en memoria. Declaramos estas variables para usarlas en ngOnDestroy
  clickListener: any;
  googleMaps: any;
  centro: Coordinates;

  constructor(private modalCtrl: ModalController, private renderer: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() { // Cuando ya cargó el DOM
    this.getGoogleMaps().then(googleMaps => {
      // Obtener ubicacion
      Plugins.Geolocation.getCurrentPosition()
        .then(geoPosition => {
          const centroCoordenadas: Coordinates = { lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude };
          this.centro = centroCoordenadas;
          this.googleMaps = googleMaps;
          const mapEl = this.mapElementRef.nativeElement; // el div es nativeElement, lo anterior es solo referencia
          const map = new googleMaps.Map(mapEl, {
            center: { lat: this.centro.lat, lng: this.centro.lng },
            zoom: 13
          });
    
          // Evento de la carga
          this.googleMaps.event.addListenerOnce(map, 'idle', () => {
            this.renderer.addClass(mapEl, 'visible');
          });
          
          // Obtener coordenadas del lugar seleccionado
          this.clickListener = map.addListener('click', event => {
            const selectedCoords = { 
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            this.modalCtrl.dismiss(selectedCoords);
          });


        })
        .catch(err => {
          console.log('No se pudo obtener la ubicacion del usuario');
        })
    })
    .catch(err => {
      console.log(err);
    })
  }

  onCancelar() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any; // window es el browser window
    const googleModule = win.google; 
    if(googleModule && googleModule.maps) {
      // no cargo el sdk otra vez
      return Promise.resolve(googleModule.maps);
    }
    // No ha sido cargado el sdk
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else{
          reject('Google maps SDK not available');
        }
      };
    })
  }

  ngOnDestroy() {
    this.googleMaps.event.removeListener(this.clickListener);
  }

}
