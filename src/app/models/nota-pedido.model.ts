import { Producto } from '../models/producto.model';
import { Almacen } from './almacen.model';

export class NotaPedido {

  constructor(
    public uuid: string,
    public document_number: string,
    public date: string,
    public warehouse: Almacen,
    public direccion: string,
    public products: Producto[],
    public status: string,
    public contacto: string,
    public observacion: string
  ) {}
}
