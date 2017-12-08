import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GuiaRemision } from '../models/guia-remision.model';

@Injectable()
export class GuiaRemisionService {
  private endpoint = `waybills`;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private api: ApiService) {}

  getAll() {
    return this.api.get(this.endpoint);
  }

  cancel(guiaId: string) {
    return this.api.patch(`${this.endpoint}/${guiaId}`, {
      status: 'canceled'
    });
  }

  getOne(id: String) {
    return this.api.get(this.endpoint + '/' + id);
  }

  save(object: GuiaRemision) {
    const data_ = this.setDataModel(object);
    return this.api.post(this.endpoint, data_);
  }

  update(object: GuiaRemision) {
    const data_ = this.setDataModel(object);
    return this.api.patch(`${this.endpoint}/${object.uuid}`, data_);
  }

  private setDataModel(guia: GuiaRemision) {
    return {
      warehouse_from: guia.warehouse_from.uuid,
      warehouse_to: guia.warehouse_to.uuid,
      order: guia.order,
      carrier: guia.carrier.uuid,
      products: guia.products,
      truck: '3d125edd-e84e-33aa-bfda-4d69239dcaee',
      transfer_guide: guia.transfer_guide.uuid,
      comment: guia.comment
    };
  }
}
