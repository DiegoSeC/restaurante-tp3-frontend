import { Producto } from '../models/producto.model';

export class GuiaSalida {
    constructor(
      public numero: string,
      public uuid: string,
      public nota_pedido: string,
      public date: string,
      public almacen_origen: string,
      public almacen_destino: string,
      public direccion: string,
      public productos: Producto[],
      public estado: string,
      public contacto: string,
      public observacion: string
    ) {}
  }