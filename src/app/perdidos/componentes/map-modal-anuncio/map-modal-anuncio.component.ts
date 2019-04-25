import { Plugins } from '@capacitor/core';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { Coordinates } from './../location.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-modal-anuncio',
  templateUrl: './map-modal-anuncio.component.html',
  styleUrls: ['./map-modal-anuncio.component.scss'],
})
export class MapModalAnuncioComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map') mapElementRef: ElementRef;
  clickListener: any;
  googleMaps: any;
  centro: Coordinates; 
  coordenadasPoligono: any;
  map: any;
  listo = false;

  constructor(private modalCtrl: ModalController,
              private renderer: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps().then(googleMaps => {
      //Obtener ubicacion
      Plugins.Geolocation.getCurrentPosition()
      .then(geoPosition => {
        const centroCoordenadas: Coordinates = { lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude };
        this.centro = centroCoordenadas;
        this.googleMaps = googleMaps;
        const mapEl = this.mapElementRef.nativeElement; // el div es nativeElement, lo anterior es solo referencia
        const map = new googleMaps.Map(mapEl, {
          center: { lat: this.centro.lat, lng: this.centro.lng },
          zoom: 15
        });
        this.map = map;
        console.log('centro latitud', map.center.lat());
        const centroLat = map.center.lat();
        console.log('centro longitud', map.center.lng());
        const centroLng = map.center.lng();
        // Evento de la carga
        this.googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapEl, 'visible');
        });

        // Pintar poligono inicial
        /*
        Coordenadas 
        San Nicolas:  Latitud: 25.7508, Longitud: -100.283
        Monterrey: Latitud: 25.6714, Longitud: -100.309
        Apodaca:  Latitud: 25.7816, Longitud: -100.188
        San Pedro: Latitud: 25.6573, Longitud: -100.402
        Gudalupe: Latitud: 25.6792, Longitud: -100.235
        */
        /* Mas o menos bien
        { lat: (centroLat + .01), lng: (centroLng) },
        { lat: (centroLat), lng: (centroLng + 0.02) },
        { lat: (centroLat - 0.01), lng: (centroLng + 0.01) },
        { lat: (centroLat - 0.01), lng: (centroLng - 0.01) },
        { lat: (centroLat), lng: (centroLng - 0.02) }
        */

        let pentagonCoords = [
          { lat: (centroLat + .001), lng: (centroLng)},
          { lat: (centroLat), lng: (centroLng + 0.002)},
          { lat: (centroLat - 0.001), lng: (centroLng + 0.001)},
          { lat: (centroLat - 0.001), lng: (centroLng - 0.001) },
          {lat: (centroLat), lng: (centroLng - 0.002)}
        ];

        let pentagono = new googleMaps.Polygon({
          paths: pentagonCoords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#FF0000',
          editable: true,
          draggable: true,
          fillOpacity: 0.35
        });

        let points = pentagono.getPath();
        let arrayPuntos = [];
        for (let i = 0; i < points.length; i++){
          arrayPuntos.push({
            lat: points.getAt(i).lat(),
            lng: points.getAt(i).lng()
          });
        }

        /*
        let arrayMarcadoresOriginal = [];
        arrayPuntos.forEach((latLng, idx) => {
          let marker = new googleMaps.Marker({
            position: { lat: latLng.lat, lng: latLng.lng }
          });
          arrayMarcadoresOriginal.push(marker);
          marker.setMap(map);
        });
        */
        //Pintar mapa
        pentagono.setMap(map);

        this.coordenadasPoligono = arrayPuntos;

        // Se modificó el area del pentagono
        googleMaps.event.addListener(pentagono.getPath(), 'set_at', () => {
          console.log('un path fue modificado set_at');

            console.log('si existia marcadores original');
            //borrar marcadores existentes
            /*
            for (let i = 0; i < arrayMarcadoresOriginal.length; i++) {
              arrayMarcadoresOriginal[i].setMap(null);
            }
            arrayMarcadoresOriginal = null;
            */

            let points = pentagono.getPath();
            let arrayPuntos = [];
            for (let i = 0; i < points.length; i++) {
              arrayPuntos.push({
                lat: points.getAt(i).lat(),
                lng: points.getAt(i).lng()
              });
            }

            console.log(arrayPuntos);
            /*
            let arrayMarcadores = [];
            
            arrayPuntos.forEach((latLng, idx) => {
              let marker = new googleMaps.Marker({
                position: { lat: latLng.lat, lng: latLng.lng }
              });
              arrayMarcadores.push(marker);
              marker.setMap(map);
            });
            arrayMarcadoresOriginal = arrayMarcadores;
            console.log('arrayMarcadores', arrayMarcadores);
            */
            this.coordenadasPoligono = arrayPuntos;

        });

        // Se agrega un nuevo punto al pentagono
        googleMaps.event.addListener(pentagono.getPath(), 'insert_at', () => {
          console.log('un path fue modificado insert_at');

            console.log('si existia marcadores original');
            //borrar marcadores existentes
            /*
            for (let i = 0; i < arrayMarcadoresOriginal.length; i++) {
              arrayMarcadoresOriginal[i].setMap(null);
            }
            arrayMarcadoresOriginal = null;
            */

            let points = pentagono.getPath();
            let arrayPuntos = [];
            for (let i = 0; i < points.length; i++) {
              arrayPuntos.push({
                lat: points.getAt(i).lat(),
                lng: points.getAt(i).lng()
              });
            }

            console.log(arrayPuntos);
            /*
            let arrayMarcadores = [];
            arrayPuntos.forEach((latLng, idx) => {
              let marker = new googleMaps.Marker({ 
                position: { lat: latLng.lat, lng: latLng.lng }
              });
              arrayMarcadores.push(marker);
              marker.setMap(map);
            })
            arrayMarcadoresOriginal = arrayMarcadores;
            */

            this.coordenadasPoligono = arrayPuntos;
        });

      }).catch(err => {
        console.log('No se pudo obtener la ubicacion del usuario');
      });
    }).catch(err => {
      console.log(err);
    })
  }

  onListo() {
      let arrayMarcadores = [];
      this.coordenadasPoligono.forEach((latLng, idx) => {
        let marker = new this.googleMaps.Marker({ 
          position: { lat: latLng.lat, lng: latLng.lng }
        });
        arrayMarcadores.push(marker);
        marker.setMap(this.map);
      });
      this.listo = true;
  }

  onConfirmar() {
    this.modalCtrl.dismiss(this.coordenadasPoligono);
  }

  onCancelar() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.googleMaps.event.removeListener(this.clickListener);
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
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIKey;
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
