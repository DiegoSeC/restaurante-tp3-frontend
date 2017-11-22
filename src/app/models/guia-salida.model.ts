import { Producto } from '../models/producto.model';
import {NotaPedido} from '../models/nota-pedido.model'

export class GuiaSalida {
    constructor(
      public document_number: string,
      public uuid: string,
      public order: NotaPedido,
      public date: string,
      public almacen_origen: string,
      public almacen_destino: string,
      public direccion: string,
      public productos: Producto[],
      public status: string,
      public contacto: string,
      public observacion: string
    ) {}
  }