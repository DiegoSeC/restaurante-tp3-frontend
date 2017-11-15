import { Producto } from '../models/producto.model';

export class NotaPedido {
  constructor(
    public numero: string,
    public uuid: string,
    public date: string,
    public almacen: string,
    public direccion: string,
    public productos: Producto[],
    public estado: string,
    public contacto: string,
    public observacion: string
  ) {}
}
