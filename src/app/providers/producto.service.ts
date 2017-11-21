import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ProductoService {
  private endpoint = 'products';

  constructor(private api: ApiService) {}

  getProductos() {
    return this.api.get(this.endpoint);
  }
}
