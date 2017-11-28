import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { NotaPedido as NotaPedidoInterface } from '../models/nota-pedido.model';
import { Producto as ProductoInterface } from '../models/producto.model';

@Injectable()
export class NotaPedidoService {
  constructor(private api: ApiService) {}

  saveNotaPedido(nota: NotaPedidoInterface) {
    const n = this.setNotaModel(nota);
    return this.api.post('orders', n);
  }

  updateNotaPedido(nota: NotaPedidoInterface) {
    const n = this.setNotaModel(nota);
    return this.api.patch(`orders/${nota.uuid}`, n);
  }

  getNotaPedidos() {
    return this.api.get('orders');
  }

  anularNotaPedido(notaId: string) {
    return this.api.patch(`orders/${notaId}`, {
      status: 'canceled'
    });
  }

  getNotaPedido(uuid: string) {
    return this.api.get('orders/' + uuid);
  }

  private setNotaModel(nota: NotaPedidoInterface) {
    const products = nota.products.map((p: ProductoInterface) => {
      return { uuid: p.uuid, quantity: p.quantity };
    });
    
    return {
      warehouse: nota.warehouse.uuid,
      products: products,
      comment: nota.comment
    };
  }
}