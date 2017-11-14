import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class ProveedorService {
    private endpoint = 'proveedor.array.json';

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get(this.endpoint);
    }
}
