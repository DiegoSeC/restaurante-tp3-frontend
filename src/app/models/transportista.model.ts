export class Transportista {
    public uuid: string;
    public driver_license: string;
    public employee: {
        document_number: string,
        name: string,
        lastname: string
    };
    constructor() {
    }
}
