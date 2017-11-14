import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudCotizacion } from './solicitud-cotizacion.model';
import { Producto } from '../interfaces/producto.interface';
import { SolicitudCotizacionService } from '../providers/solicitud-cotizacion.service';
import { ProductoService } from '../providers/producto';

@Component({
    selector: 'app-solicitud-cotizacion',
    templateUrl: 'solicitud-cotizacion.component.html'
})
export class SolicitudCotizacionNewComponent {
    public action: string;
    public solicitud: SolicitudCotizacion;
    public productos: Producto[];
    private modalAlmacenRef: NgbModalRef;
    private modalProductoRef: NgbModalRef;

    public query: string;
    private sub: any;

    constructor(private modalService: NgbModal,
                private producto: ProductoService,
                private solicitudService: SolicitudCotizacionService,
                private router: Router,
                private route: ActivatedRoute) {}

}
