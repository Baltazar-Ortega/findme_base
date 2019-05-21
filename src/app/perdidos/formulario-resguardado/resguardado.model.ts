export class Resguardado{
    constructor(
        public fechaEncontrado: Date,
        public mensaje: string,
        public duenoId: string,
        public rescatadorId: string,
        public perroId: string,
        public image: any
    ) {}
}