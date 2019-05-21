import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesResguardadosService {

  mensajes: any;
  constructor(private http: HttpClient) { }

  getMensajesResguardados() {
    const mensajes: Array<any> = [];
    return this.http.get('https://findme-proyecto-9d68a.firebaseio.com/mensajes-resguardados.json').pipe(map(resData => {
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
            mensajes.push({
              key,
              fechaEncontrado: resData[key].fechaEncontrado,
              image: resData[key].image,
              mensaje: resData[key].mensaje,
              perroId: resData[key].perroId, 
              rescatadorId: resData[key].rescatadorId,
              duenoId: resData[key].duenoId
            });
          }
      }
      this.mensajes = mensajes;
      console.log('mensajes-resguardados', this.mensajes);
      return this.mensajes;
    }));
  }
}
