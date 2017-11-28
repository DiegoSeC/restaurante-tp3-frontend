import { Producto } from '../models/producto.model';
import {NotaPedido} from '../models/nota-pedido.model';
import { Almacen } from './almacen.model';

export class GuiaSalida {
    constructor(
      public document_number: string,
      public uuid: string,
      public order: NotaPedido,
      public date: string,
      public warehouse_from: Almacen,
      public warehouse_to: Almacen,
      public direccion: string,
      public products: Producto[],
      public status: string,
      public contact: string,
      public comment: string
    ) {}
}
