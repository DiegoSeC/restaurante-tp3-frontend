import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ProductoService {
  constructor(private api: ApiService) {}

  getProductos() {
    return this.api.get('productos.array.json');
  }
}
