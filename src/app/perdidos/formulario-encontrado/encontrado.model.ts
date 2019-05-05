import { PlaceLocation } from '../componentes/location.model';

export class Encontrado{
    constructor(
        public fechaEncontrado: Date,
        public mensaje: string,
        public image: any,
        public location: PlaceLocation
    ) {}
}