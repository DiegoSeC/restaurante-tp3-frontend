import { Transportista } from '../models/transportista.model';
import { Camion } from '../models/camion.model';
import { Almacen } from './almacen.model';

export class GuiaRemision {
    public uuid: String;
    public document_number: String;
    public date: String;
    public time: String;
    public carrier: Transportista[];
    public truck: Camion[];
    public warehouse_from: Almacen[];
    public warehouse_to: Almacen[];
    public comment: String;
    public delivery_status: String;
    public status: String;

    constructor() {
    }
}
