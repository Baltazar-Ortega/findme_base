import { PlaceLocation } from './../componentes/location.model';
export class Anuncio {
    constructor(
        public nombrePerro: string,
        public raza: string,
        public descripcion: string,
        public fechaPerdido: Date,
        public location: PlaceLocation
    ) {}
}