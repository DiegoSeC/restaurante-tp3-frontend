import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Transportista } from '../models/transportista.model';

@Injectable()
export class TransportistaService {
    constructor(private api: ApiService) {}

    getAll() {
        //const url = `carriers`;
        const url = `transportista.array.json`;
        return this.api.get(url);
    }

}
