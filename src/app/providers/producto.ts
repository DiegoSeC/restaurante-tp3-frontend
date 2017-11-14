import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable()
export class ProductoService {
  constructor(private api: Api) {}

  getProductos() {
    return this.api.get('productos.array.json');
  }
}
