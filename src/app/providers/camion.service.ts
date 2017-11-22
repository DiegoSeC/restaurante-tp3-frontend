import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CamionService {

    constructor(private api: ApiService) {}

    getCamiones() {
        const url = `camiones.array.json`;
        return this.api.get(url);
    }
}
