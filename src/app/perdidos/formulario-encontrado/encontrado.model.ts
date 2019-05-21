import { PlaceLocation } from '../componentes/location.model';

export class Encontrado{
    constructor(
        public fechaEncontrado: Date,
        public mensaje: string,
        public location: PlaceLocation,
        public duenoId: string,
        public observadorId: string,
        public perroId: string,
        public image?: any,
    ) {}
}