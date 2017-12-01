import { Transportista } from '../models/transportista.model';
import { Camion } from '../models/camion.model';
import { Almacen } from './almacen.model';
import { Producto } from '../models/producto.model';

export class GuiaRemision {
    public uuid: string;
    public document_number: string;
    public date: string;
    public time: string;
    public carrier: {
        uuid: string,
        driver_license: string,
        name: string,
        last_name: string
    };
    public truck: Camion;
    public warehouse_from: {
        uuid: string,
        code: string,
        contact: string,
        email: string,
        phone_number: string,
        longitude: string,
        latitude: string
    };
    public warehouse_to: {
        uuid: string,
        code: string,
        contact: string,
        email: string,
        phone_number: string,
        longitude: string,
        latitude: string
    };
    public comment: string;
    public delivery_status: string;
    public status: string;
    public order: {
        uuid: string,
        document_number: string
    };
    public products: Producto[];
    constructor() {
    }
}
