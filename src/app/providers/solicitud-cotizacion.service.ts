import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SolicitudCotizacion } from '../models/solicitud-cotizacion.model';

@Injectable()
export class SolicitudCotizacionService {
    private endpoint = 'solicitud-cotizacion.array.json';

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get(this.endpoint);
    }

    save(object: SolicitudCotizacion) {
        return this.api.post(this.endpoint, object);
    }

    update(object: SolicitudCotizacion) {
        return this.api.put(this.endpoint, object);
    }

    cancel(id: string) {
        return this.api.put(this.endpoint, {
                                            uuid: id,
                                            estado: 'Anulado'
                                            }
                            );
    }

    getOne(id: string) {
        const endpoint2 = 'solicitud-cotizacion.json';
        return this.api.get(endpoint2);
    }
}
