import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudCotizacionService } from '../providers/solicitud-cotizacion.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudCotizacion } from '../models/solicitud-cotizacion.model';

@Component({
    selector: 'app-solicitud-cotizacion',
    templateUrl: 'solicitud-cotizacion.component.html'
})
export class SolicitudCotizacionComponent implements OnInit {
    solicitudes: SolicitudCotizacion[];
    solicitudNumero: string;
    solicitudIndex: number;
    private modalNotaRef: NgbModalRef;
    private sub: any;
    anularAction: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private api: SolicitudCotizacionService,
                private modalService: NgbModal) {
        this.getAllSolicitudes();
    }

    ngOnInit() {
        this.solicitudNumero = this.route.snapshot.queryParams['id'];
    }

    goToForm(): void {
        this.router.navigateByUrl('solicitud-cotizacion/new');
    }

    getAllSolicitudes() {
        this.api.getAll()
                .subscribe(data => {
                            this.solicitudes = data['data'];
                        }
                );
    }

    openAnularModal(content, index) {
        this.solicitudIndex = index;
        this.modalNotaRef = this.modalService.open(content);
    }

    anular() {
        const solicitud = this.solicitudes[this.solicitudIndex];

        this.solicitudes[this.solicitudIndex].status = 'canceled';
        this.anularAction = true;

        this.api.cancel(solicitud.uuid)
                .subscribe(data => {
                                this.modalNotaRef.close();
                            },
                            error => {
                                this.modalNotaRef.close();
                        }
                        );

        //this.getAllSolicitudes();
    }
}
