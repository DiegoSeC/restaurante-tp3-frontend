import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GuiaRemision } from '../models/guia-remision.model';
import 'rxjs/add/operator/toPromise';
import 'rxjs/RX';

@Injectable()
export class GuiaRemisionService {

    constructor(private api: ApiService) {}
    // tslint:disable-next-line:prefer-const

    getAll() {
        // tslint:disable-next-line:prefer-const
        let url = `waybills`;
        return this.api.get(url);
    }

    cancel(id: String) {
        // tslint:disable-next-line:prefer-const
        let url = `http://190.85.228.7/rest-backend/public/api/waybills/`;
        return this.api.put(url + id, {
            uuid: id,
            status: 'Anulado'
        });
    }
}
