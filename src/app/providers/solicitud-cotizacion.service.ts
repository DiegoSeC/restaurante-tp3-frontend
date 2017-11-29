import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SolicitudCotizacion } from '../models/solicitud-cotizacion.model';
import { Producto } from '../models/producto.model';

@Injectable()
export class SolicitudCotizacionService {
    /*private endpoint = 'solicitud-cotizacion.array.json';*/
    private endpoint = 'quotation-requests';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get(this.endpoint);
    }

    getOne(id: string) {
        /*const endpoint2 = 'solicitud-cotizacion.json';*/
        return this.api.get(this.endpoint + '/' + id);
    }

    save(object: SolicitudCotizacion) {
        /*console.log(JSON.stringify(object));*/
        const s = this.setDataModel(object);
        /*console.log(JSON.stringify(s));*/
        return this.api.post(this.endpoint, s);
    }

    update(object: SolicitudCotizacion) {
        return this.api.put(this.endpoint, object);
    }

    cancel(object: SolicitudCotizacion) {
        return this.api.patch(`${this.endpoint}/${object.uuid}`, { status: object.status });
    }

    private setDataModel(solicitud: SolicitudCotizacion) {
        const products = solicitud.products
                                    .map(
                                        (p: Producto) => {
                                            return { uuid: p.uuid, quantity: p.quantity };
                                        }
                                    );
        return {
            /*date : solicitud.date,
            document_number: solicitud.document_number,*/
            order: solicitud.order.uuid,
            products: products
        };
    }
}
