import { HttpClient } from '@angular/common/http';
import { Encontrado } from './../perdidos/formulario-encontrado/encontrado.model';
import { Injectable } from '@angular/core';

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
export class PerrosEncontradosService {

  constructor(private http: HttpClient) { }

  mandarAnuncioEncontrado(data: Encontrado) {
    console.log(data);
    return this.http.post('https://findme-proyecto-9d68a.firebaseio.com/mensajes-encontrados.json', data);
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
}
