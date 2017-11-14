import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable()
export class AlmacenService {
  constructor(private api: Api) {}

  getAlmacenes() {
    return this.api.get('almacen.array.json');
  }
}
