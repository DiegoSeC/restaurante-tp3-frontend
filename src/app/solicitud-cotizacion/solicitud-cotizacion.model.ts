import { Producto } from '../interfaces/producto.interface';
import { Proveedor } from '../interfaces/proveedor.model';

export class SolicitudCotizacion {
    constructor(public uuid: string,
                public numero: string,
                public fecha: string,
                public date: string,
                public estado: string,
                public productos: Producto[],
                public proveedores: Proveedor[]) {}

}
