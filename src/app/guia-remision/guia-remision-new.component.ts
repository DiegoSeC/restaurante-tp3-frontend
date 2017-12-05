import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiaRemision } from '../models/guia-remision.model';
import { NotaPedido } from '../models/nota-pedido.model';
import { Transportista } from '../models/transportista.model';
import { Almacen } from '../models/almacen.model';
import { GuiaSalida } from '../models/guia-salida.model';

import { GuiaRemisionService } from '../providers/guia-remision.service';
import { NotaPedidoService } from '../providers/nota-pedido.service';
import { TransportistaService } from '../providers/transportista.service';
import { AlmacenService } from '../providers/almacen.service';
import { GuiaSalidaService } from '../providers/guia-salida.service';

@Component({
    selector: 'app-guia-remision-new',
    templateUrl: 'guia-remision-new.componente.html'
})
// tslint:disable-next-line:component-class-suffix
export class GuiaRemisionNewcomponent implements OnInit {
    public action: string;
    guia: GuiaRemision;
    notaspedidos: NotaPedido[];
    guiassalida: GuiaSalida[];
    transportistas: Transportista[];
    almacenes: Almacen[];
    private modalNotasRef: NgbModalRef;
    private modalTranspRef: NgbModalRef;
    private modalAlmacenRef: NgbModalRef;
    private modalSubmit: NgbModalRef;
    public query: string;
    private sub: any;
    private today: any = new Date();

    constructor(private modalService: NgbModal,
                private guiasalidaService: GuiaSalidaService,
                private transpService: TransportistaService,
                private almService: AlmacenService,
                private guiaremisionService: GuiaRemisionService,
                private router: Router,
                private route: ActivatedRoute) {
        this.guia = <GuiaRemision> {
            carrier: {},
            transfer_guide: {},
            date: `${this.today.getDate()}-${this.today.getMonth() + 1}-${this.today.getFullYear()}`,
            warehouse_from: {},
            warehouse_to: {}
        };

        this.getNotas();
        this.getTransportistas();
        this.getAlmacenes();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                if (typeof params['id'] === 'undefined') {
                    this.setguiaDefault();
                } else {
                    console.log('id => ' + params['id']);
                    this.getGuia(params['id']);
                }
            });
    }

    setguiaDefault() {
        this.action = 'registrar';
    }

    getGuia(id: string) {
        this.action = 'actualizar';
        this.guiaremisionService.getOne(id)
                .subscribe(
                    data => {
                        this.guia = data['data'];
                    },
                    error => {
                        console.log(error);
                    }
                );
    }

    getNotas() {
        this.guiasalidaService.getAll()
                                .subscribe(
                                    data => {
                                        const n = data['data'];
                                        this.guiassalida = n.filter(nota => nota.status === 'active');
                                    },
                                    error => {
                                        console.log(error);
                                    }
                                );
    }

    getTransportistas() {
        this.transpService.getAll()
                                    .subscribe(
                                        data => {
                                            this.transportistas = data['data'];
                                        },
                                        error => {
                                            console.log(error);
                                        }
                                    );
    }

    getAlmacenes() {
        this.almService.getAlmacenes()
                                        .subscribe(
                                            data => {
                                                this.almacenes = data['data'];
                                            },
                                            error => {
                                                console.log(error);
                                            }
                                        );
    }

    openNotaPedidoModal(content) {
        this.modalNotasRef = this.modalService.open(content);
    }

    addNotaPedido(guia: GuiaSalida, index: number) {
        this.guia.transfer_guide.document_number = guia.document_number;
        this.guia.warehouse_from.code = guia.warehouse_from.code;
        this.modalNotasRef.dismiss();
    }

    openTransportistaModal(content) {
        this.modalTranspRef = this.modalService.open(content);
    }

    addTransportista(transportista: Transportista, index: number) {
        this.guia.carrier.name = transportista.employee.name;
        this.guia.carrier.driver_license = transportista.driver_license;
        this.modalTranspRef.dismiss();
    }

    openAlmacenModal(content) {
        this.modalAlmacenRef = this.modalService.open(content);
    }

    addAlmacen(almacen: Almacen, index: number) {
        this.guia.warehouse_to.code = almacen.code;
        this.modalAlmacenRef.dismiss();
    }

    openGuardarModal(content) {
        this.modalSubmit = this.modalService.open(content);
    }

    onSubmit() {
        this.modalSubmit.close();
        this.modalSubmit.result.then(data => {
          this.router.navigateByUrl(`guia-remision`);
        });
      }

}
