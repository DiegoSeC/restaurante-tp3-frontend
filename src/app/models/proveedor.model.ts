
export class Proveedor {
    constructor(public uuid: string,
                public document_number: string,
                public name: string,
                public contact_name: string,
                public address: string,
                public phone_number: string,
                public quantity_products: string,
                public disabled?: boolean) {}
}
