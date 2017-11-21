import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AlmacenService {
  private endpoint = 'warehouses';
  constructor(private api: ApiService) {}

  getAlmacenes() {
    return this.api.get(this.endpoint);
  }
}
