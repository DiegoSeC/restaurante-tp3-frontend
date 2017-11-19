import { Transportista } from '../models/transportista.model';
import { Camion } from '../models/camion.model';
import { Almacen } from './almacen.model';

export class GuiaRemision {
    public uuid: string;
    public document_number: string;
    public date: string;
    public time: string;
    public carrier: Transportista[];
    public truck: Camion[];
    public warehouse_from: Almacen[];
    public warehouse_to: Almacen[];
    public comment: string;
    public delivery_status: string;
    public status: string;

    constructor() {
    }
}
