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
    return this.api.get('transfer-guides/' + uuid);
  }

  saveGuiaSalida(guiasalida: GuiaSalidaInterface) {
    const guia = this.setNotaModel(guiasalida);
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
      warehouse_from: guia.warehouse_from.uuid,
      warehouse_to: guia.warehouse_to.uuid,
      order: guia.order.uuid,
      products: products,
      contact: guia.contact,
      comment: guia.comment,
      status: guia.status
    };
  }
}
