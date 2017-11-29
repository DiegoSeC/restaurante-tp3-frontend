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
          warehouse_from_uuid: '79ddd0ff-be9a-3822-a464-5b0b6485d219',
          warehouse_to_uuid: guia.warehouse_from.uuid,
          order_uuid: guia.order.uuid,
          carrier: '1cb04144-12af-3490-a6ee-86280c149aa0',
          truck: '7d4e7c98-4906-3661-9a7c-6ed97529c96a',
          products: products,
          contact: guia.contact,
          comment: guia.comment
        };
      }
}
