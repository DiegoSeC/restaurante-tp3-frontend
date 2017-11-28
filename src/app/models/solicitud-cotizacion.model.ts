import { Producto } from '../models/producto.model';
import { Proveedor } from '../models/proveedor.model';
import { NotaPedido } from '../models/nota-pedido.model';

export class SolicitudCotizacion {

    constructor(public uuid: string,
                public document_number: string,
                public date: string,
                public status: string,
                public order: NotaPedido,
                public products: Producto[],
                public suppliers: Proveedor[]) {}

}
