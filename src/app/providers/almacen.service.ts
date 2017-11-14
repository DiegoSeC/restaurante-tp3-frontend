import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AlmacenService {
  constructor(private api: ApiService) {}

  getAlmacenes() {
    return this.api.get('almacen.array.json');
  }
}
