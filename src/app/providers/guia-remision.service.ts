import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GuiaRemision } from '../models/guia-remision.model';
import 'rxjs/RX';

@Injectable()
export class GuiaRemisionService {

    constructor(private api: ApiService) {}
    private url = `waybills`;

    getAll() {
        return this.api.get(this.url);
    }

    cancel(id: String) {
        return this.api.put(this.url + '/batch-update', {
            waybills: {
                uuid: id,
                status: 'canceled',
                delivery_status: 'canceled'
            }
        });
    }

    getOne(id: String) {
        return this.api.get(this.url + '/' + id);
    }

    save(object: GuiaRemision) {
        return this.api.put(this.url + `batch-update`, GuiaRemision);
    }

}
