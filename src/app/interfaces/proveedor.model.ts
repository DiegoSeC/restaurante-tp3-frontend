
export class Proveedor {
    constructor(public uuid: string,
                public codigo: string,
                public razon_social: string,
                public disabled?: boolean) {}
}
