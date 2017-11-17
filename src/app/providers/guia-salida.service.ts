import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class GuiaSalidaService {
    private endpoint = 'guia-salida.array.json';

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get(this.endpoint);
    }

    getGuiaSalidas() {
        return this.api.get(this.endpoint);
      }
}
