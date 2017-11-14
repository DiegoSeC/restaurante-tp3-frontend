import { Producto } from '../interfaces/producto.interface';

export class SolicitudCotizacion {
    constructor(
        public uuid: string,
        public numero: string,
        public date: string,
        public productos: Producto[],
        public estado: string
        ) {}
}
