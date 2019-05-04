import { Anuncio } from './../perdidos/crear-anuncio/anuncio.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PerrosPerdidosService {

  public todosPerrosPerdidos: any;

  constructor(private http: HttpClient) { }

  agregarAnuncio(anuncio: Anuncio) {
    console.log(anuncio);
    return this.http.post('https://findme-proyecto-9d68a.firebaseio.com/anuncios.json', anuncio);
  }

  obtenerAnuncios() {
    return this.http.get('https://findme-proyecto-9d68a.firebaseio.com/anuncios.json').pipe(map(resData => {
      const perrosPerdidos: Array<any> =  [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          perrosPerdidos.push({
            key,
            nombrePerro: resData[key].nombrePerro,
            raza: resData[key].raza,
            descripcion: resData[key].descripcion,
            fechaPerdido: new Date(resData[key].fechaPerdido),
            image: resData[key].image
          });
        }
      }
      console.log(perrosPerdidos[0].key);
      return perrosPerdidos;
    }))
  /*.subscribe(datos => {
      console.log(datos);
      this.todosPerrosPerdidos = datos;
      console.log(this.todosPerrosPerdidos);
    });*/
  }

  obtenerAnuncio(key: string) {
    let perro: any;
    this.todosPerrosPerdidos.forEach(el => {
      if(el.key === key){
        console.log('encontrado');
        perro = el;
      }
    });
    return perro;
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    /* Retornará un observable, url es una url que podemos agarrar de donde sea, y path es la imagen local desde el backend*/
    return this.http.post<{imageUrl: string, imagePath: string}>(
      'https://us-central1-findme-proyecto-9d68a.cloudfunctions.net/storeImage',
      uploadData
    );
  }

}
