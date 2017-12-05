import { Producto } from '../models/producto.model';
import { Almacen } from './almacen.model';

export class NotaPedido {
  constructor(
    public uuid: string,
    public document_number: string,
    public warehouse: {
      uuid: string;
      code: string;
      name: string;
      contact: string;
      email: string;
      address: string;
      phone_number: string;
      longitude: string;
      latitude: string;
    },
    public date: string,
    public direccion: string,
    public products: Producto[],
    public status: string,
    public contacto: string,
    public comment: string
  ) {}
}
