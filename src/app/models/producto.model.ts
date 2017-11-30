import { Proveedor } from './proveedor.model';

export class Producto {
  constructor(
    public uuid: string,
    public sku: string,
    public name: string,
    public description: string,
    public unit_of_measurement: string,
    public quantity: number,
    public suppliers: Proveedor[],
    public disabled?: boolean
  ) {}
}
