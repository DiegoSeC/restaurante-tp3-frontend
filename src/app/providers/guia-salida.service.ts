import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { GuiaSalida as GuiaSalidaInterface } from '../models/guia-salida.model';
import { Producto as ProductoInterface } from '../models/producto.model';
import { NotaPedido as NotaPedidoInterface } from '../models/nota-pedido.model';

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
        const guia = this.setNotaModel(guiasalida);

        console.info(guia);
        return this.api.post('transfer-guides', guia);
      }
    
      updateGuiaSalida(guiasalida: GuiaSalidaInterface) {
        const guia = this.setNotaModel(guiasalida);
        return this.api.put(`transfer-guides/${guiasalida.uuid}`, guia);
      }

      private setNotaModel(guia: GuiaSalidaInterface) {
        const products = guia.products.map((p: ProductoInterface) => {
          return { uuid: p.uuid, quantity: p.quantity };
        });
        
        return {
          warehouse_from_uuid: '972e4c84-f7e9-3939-84fb-a1d9df416778',
          warehouse_to_uuid: guia.warehouse_from.uuid,
          order_uuid: guia.order.uuid,
          products: products,
          contact: guia.contact,
          comment: guia.comment
        };
      }
}
