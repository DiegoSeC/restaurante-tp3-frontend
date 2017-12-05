import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GuiaRemision } from '../models/guia-remision.model';
import 'rxjs/RX';

@Injectable()
export class GuiaRemisionService {

    private endpoint = `waybills`;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get(this.endpoint);
    }

    cancel(guiaId: string) {
        return this.api.patch(`${this.endpoint}/${guiaId}`, {
            status: 'canceled'
        });
    }

    getOne(id: String) {
        return this.api.get(this.endpoint + '/' + id);
    }

    save(object: GuiaRemision) {
        const data_ = this.setDataModel(object);
        return this.api.post(this.endpoint + `batch-update`, data_);
    }

    private setDataModel(guia: GuiaRemision) {
        return {
            uuid: guia.uuid
        };
    }

}
