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

    // Pagination
  public page = 1;
  public totalItems = 0;
  private localSolicitudes: Array<SolicitudCotizacion[]> = [];

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
        this.api.getAll().subscribe(data => {
            this.solicitudes = data['data'];
            const solicitudes = data['data'];
            let i, j, temparray, chunk = 10;
            for (i = 0, j = solicitudes.length; i < j; i += chunk) {
                temparray = solicitudes.slice(i,i+chunk);
                this.localSolicitudes.push(temparray);
            }

            this.solicitudes = this.localSolicitudes[0];
            this.totalItems = solicitudes.length;
        });
    }

    getPagination(e) {
        this.solicitudes = this.localSolicitudes[e - 1];
      }

    openAnularModal(content, index) {
        this.solicitudIndex = index;
        this.modalNotaRef = this.modalService.open(content);
    }

    anular() {
        const solicitudToCancel = this.solicitudes[this.solicitudIndex];
        //this.solicitudes[this.solicitudIndex].status = 'canceled';
        solicitudToCancel.status = 'canceled';
        this.anularAction = true;

        this.api.cancel(solicitudToCancel)
                .subscribe(data => {
                                this.modalNotaRef.close();
                                this.getAllSolicitudes();
                            },
                            error => {
                                this.modalNotaRef.close();
                        }
                        );
    }
}
