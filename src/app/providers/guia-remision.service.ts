import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GuiaRemision } from '../models/guia-remision.model';
import 'rxjs/RX';

@Injectable()
export class GuiaRemisionService {

    constructor(private api: ApiService) {}

    getAll() {
        //const url = `waybills`;
        const url = `guia-remision.array.json`;
        return this.api.get(url);
    }

    cancel(id: String) {
        //const url = `waybills/`;
        const url = `guia-remision.json/`;
        return this.api.put(url + id, {
            uuid: id,
            status: 'Anulado'
        });
    }

    getOne(id: String) {
        //const url = `waybills/`;
        const url = `guia-remision.json`;
        ///return this.api.get(url + id);
        return this.api.get(url);
    }
}
