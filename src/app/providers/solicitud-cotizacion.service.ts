import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SolicitudCotizacion } from '../models/solicitud-cotizacion.model';

@Injectable()
export class SolicitudCotizacionService {
    /*private endpoint = 'solicitud-cotizacion.array.json';*/
    private endpoint = 'quotation-requests';

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get(this.endpoint);
    }

    getOne(id: string) {
        /*const endpoint2 = 'solicitud-cotizacion.json';*/
        return this.api.get(this.endpoint + '/' + id);
    }

    save(object: SolicitudCotizacion) {
        return this.api.post(this.endpoint, object);
    }

    update(object: SolicitudCotizacion) {
        return this.api.put(this.endpoint, object);
    }

    cancel(id: string) {
        return this.api.patch(`${this.endpoint}/${id}`, { status: 'canceled' });
    }

}
