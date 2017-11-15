import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class GuiaRemisionService {
    private endpoint = 'guia-remision.array.json';

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get(this.endpoint);
    }
}
