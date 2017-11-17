import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GuiaRemision } from '../models/guia-remision.model';

@Injectable()
export class GuiaRemisionService {
    private endpoint = 'guia-remision.array.json';

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get(this.endpoint);
    }

    save(object: GuiaRemision) {
        return this.api.post(this.endpoint, object);
    }

    update(object: GuiaRemision) {
        return this.api.put(this.endpoint, object);
    }

    cancel(id: String) {
        return this.api.put(this.endpoint, {
            uuid: id,
            status: 'Anulado'
        });
    }

    getOne(id: String) {
        const endpoint2 = 'solicitud-cotizacion.json';
        return this.api.get(endpoint2);
    }
}
