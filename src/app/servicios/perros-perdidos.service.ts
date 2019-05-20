import { Plugins } from '@capacitor/core';
import { Anuncio } from './../perdidos/crear-anuncio/anuncio.model';

import { Injectable, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Injectable({
  providedIn: 'root'
})
export class PerrosPerdidosService implements AfterViewInit {

  public todosPerrosPerdidos: any;
  public centro: any;
  public googleMaps: any;

  constructor(private http: HttpClient) {
   }

   ngAfterViewInit(){
   }

  agregarAnuncio(anuncio: Anuncio) {
    console.log(anuncio);
    return this.http.post('https://findme-proyecto-9d68a.firebaseio.com/anuncios.json', anuncio);
  }

  obtenerAnuncios(filtroValue) {
    Plugins.Geolocation.getCurrentPosition()
        .then(geoPosition => {
          const centroCoordenadas = { lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude };
          this.centro = centroCoordenadas;
          console.log('Mi centro', this.centro);
    });
    return this.http.get('https://findme-proyecto-9d68a.firebaseio.com/anuncios.json').pipe(map(resData => {
      const perros: Array<any> =  [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          perros.push({
            key,
            nombrePerro: resData[key].nombrePerro,
            raza: resData[key].raza,
            descripcion: resData[key].descripcion,
            fechaPerdido: new Date(resData[key].fechaPerdido),
            duenoId: resData[key].duenoId,
            perdido: resData[key].perdido,
            image: resData[key].image,
            location: resData[key].location
          });
        }
      }
      // Solo perros encontrados
      const perrosPerdidos = perros.filter(perro => perro.perdido === true);
      console.log('Perros Perdidos, filter', perrosPerdidos);
      if (filtroValue === 'all') {
        this.todosPerrosPerdidos = perrosPerdidos;
        return perrosPerdidos;
      } else  {
        const perrosFiltrados = [];
        this.getGoogleMaps().then(googleMaps => {
          this.googleMaps = googleMaps;
          perrosPerdidos.filter(anuncio => {
            let aDistancia = false;
            anuncio.location.array.forEach(position => {
              // Si por lo menos una posicion entra en el rango, si entra el poligono
              const marcador = new googleMaps.LatLng(position.lat, position.lng);
              const centroLatLng = new this.googleMaps.LatLng(this.centro.lat, this.centro.lng);
              const distanciaEnKm = this.googleMaps.geometry.spherical.computeDistanceBetween(marcador, centroLatLng) / 1000;
              if (distanciaEnKm <= parseFloat(filtroValue)) { 
                aDistancia = true;
              }
            });
            if (aDistancia) {
              perrosFiltrados.push(anuncio);
              console.log(perrosFiltrados);
            }
          });
        }); // Fin getGoogleMaps
        console.log(`Perros filtrados ${filtroValue} km`, perrosFiltrados);
        this.todosPerrosPerdidos = perrosFiltrados;
        return perrosFiltrados;
      }
    })
    ) // cierre del pipe
  /*.subscribe(datos => {
      console.log(datos);
      this.todosPerrosPerdidos = datos;
      console.log(this.todosPerrosPerdidos);
    });*/
  }

  obtenerAnuncio(key: string) {
    let anuncios: any[] = [];
    console.log('this.todosPerrosPerdidos', this.todosPerrosPerdidos);
    this.todosPerrosPerdidos.forEach(el => {
      if(el.duenoId === key){
        console.log('encontrado');
        anuncios.push(el);
      }
    });
    return anuncios;
  }

  obtenerPerro(key: string) {
    let perro = null;
    this.todosPerrosPerdidos.forEach(el => {
      if (key === el.key) {
        perro = el;
      }
    });
    return perro;
  }

  updateLikes(id: any, anuncio: any){
    return this.http.put(`https://findme-proyecto-9d68a.firebaseio.com/anuncios.json/${id}`, anuncio);
  }

  uploadImage(image: string | File) {
    console.log('En uploadImage');
    if (typeof image === 'string') {
      console.log('Tipo de dato string');
      const imageFile = base64toBlob(image.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
      console.log('SERVICIO uploadImage'); 
      console.log(typeof imageFile); // No se convirtió en File
      /* Retornará un observable, url es una url que podemos agarrar de donde sea, y path es la imagen local desde el backend*/
      return this.http.post(
        'https://us-central1-findme-proyecto-9d68a.cloudfunctions.net/storeImage',
        imageFile
      );
    } else {
      console.log('Tipo de dato file');
      const uploadData = new FormData();
      uploadData.append('image', image);
      /* Retornará un observable, url es una url que podemos agarrar de donde sea, y path es la imagen local desde el backend*/
      return this.http.post<{imageUrl: string, imagePath: string}>(
        'https://us-central1-findme-proyecto-9d68a.cloudfunctions.net/storeImage',
        uploadData
      );
    }
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
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIKey + '&libraries=geometry';
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

}
