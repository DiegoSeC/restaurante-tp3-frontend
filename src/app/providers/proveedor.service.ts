import { Injectable } from '@angular/core';

import { Api } from './api';

@Injectable()
export class ProveedorService {
    private endpoint = 'proveedor.array.json';

    constructor(private api: Api) {}

    getAll() {
        return this.api.get(this.endpoint);
    }
}
