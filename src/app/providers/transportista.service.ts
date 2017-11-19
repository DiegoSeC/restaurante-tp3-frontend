import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Transportista } from '../models/transportista.model';

@Injectable()
export class TransportistaService {
    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get('transportista.array.json');
    }

}
