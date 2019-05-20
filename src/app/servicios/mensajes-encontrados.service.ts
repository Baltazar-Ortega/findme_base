import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesEncontradosService {
  mensajes: any;
  constructor(private http: HttpClient) { }

  getMensajesEncontrados() {
    const mensajes: Array<any> = [];
    return this.http.get('https://findme-proyecto-9d68a.firebaseio.com/mensajes-encontrados.json').pipe(map(resData => {
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
            mensajes.push({
              key,
              fechaEncontrado: resData[key].fechaEncontrado,
              image: resData[key].image,
              location: resData[key].location,
              mensaje: resData[key].mensaje,
              perroId: resData[key].perroId, 
              observadorId: resData[key].observadorId,
              duenoId: resData[key].duenoId
            });
          }
      }
      this.mensajes = mensajes;
      console.log('mensajes-encontrados', this.mensajes);
      return this.mensajes;
    }));

  }
}
