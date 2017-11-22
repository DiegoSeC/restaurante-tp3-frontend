import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { NotaPedido as NotaPedidoInterface } from '../models/nota-pedido.model';

@Injectable()
export class NotaPedidoService {
  //private endpoint = 'orders';
  private endpoint = 'nota-pedido.array.json';

  constructor(private api: ApiService) {}

  saveNotaPedido(nota: NotaPedidoInterface) {
    return this.api.post('productos.array.json', nota);
  }

  updateNotaPedido(nota: NotaPedidoInterface) {
    return this.api.put('productos.array.json', nota);
  }

  getNotaPedidos() {
    return this.api.get(this.endpoint);
  }

  anularNotaPedido(notaId: string) {
    return this.api.put('nota-pedido.array.json', {
      uuid: notaId,
      estado: 'Anulado'
    });
  }

  getNotaPedido(uuid: string) {
    return this.api.get('nota-pedido.json');
  }
}
