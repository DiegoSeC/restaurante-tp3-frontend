import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import { GuiaRemision } from '../models/guia-remision.model';
import 'rxjs/add/operator/map';
import 'rxjs/RX';

@Injectable()
export class GuiaRemisionService {

    constructor(private http: Http) {}
    // tslint:disable-next-line:prefer-const
    _data: any;

    getAll() {
        // tslint:disable-next-line:prefer-const
        let url = `http://190.85.228.7/rest-backend/public/api/waybills`;
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise((resolve, reject) => {
            this.http.get(url).subscribe(
                res => {
                    resolve(res.json());
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    cancel(id: String) {
        // tslint:disable-next-line:prefer-const
        let url = `http://190.85.228.7/rest-backend/public/api/waybills/`;
        return this.http.put(url + id, {
            uuid: id,
            status: 'Anulado'
        });
    }
}
