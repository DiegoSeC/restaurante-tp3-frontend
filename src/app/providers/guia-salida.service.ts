import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { GuiaSalida as GuiaSalidaInterface } from '../models/guia-salida.model';

@Injectable()
export class GuiaSalidaService {
    private endpoint = 'guia-salida.array.json';

    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get('transfer-guides');
    }

    getGuiaSalidas() {
        return this.api.get('transfer-guides');
    }

    anularGuiaSalida(guiaId: string) {
        return this.api.patch(`transfer-guides/${guiaId}`, {
          status: 'inactive'
        });
      }
    
    getGuiaSalida(uuid: string) {
        return this.api.get(this.endpoint);
    }

    saveGuiaSalida(guiasalida: GuiaSalidaInterface) {
        return this.api.post('productos.array.json', guiasalida);
      }
    
      updateGuiaSalida(guiasalida: GuiaSalidaInterface) {
        return this.api.put('productos.array.json', guiasalida);
      }
}
