import { Producto } from '../models/producto.model';
import { Proveedor } from '../models/proveedor.model';

export class SolicitudCotizacion {
    public uuid: string;
    public numero: string;
    public fecha: string;
    public date: string;
    public estado: string;
    public productos: Producto[];
    public proveedores: Proveedor[];

    constructor() {
    }
    /*constructor(public uuid: string,
                public numero: string,
                public fecha: string,
                public date: string,
                public estado: string,
                public productos: Producto[],
                public proveedores: Proveedor[]) {}*/

}
