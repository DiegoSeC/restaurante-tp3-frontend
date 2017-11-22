import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiaRemision } from '../models/guia-remision.model';
import { NotaPedido } from '../models/nota-pedido.model';
import { Transportista } from '../models/transportista.model';

import { GuiaRemisionService } from '../providers/guia-remision.service';
import { NotaPedidoService } from '../providers/nota-pedido.service';
import { TransportistaService } from '../providers/transportista.service';
//import { CamionService } from '../providers/camion.service';

@Component({
    selector: 'app-guia-remision-new',
    templateUrl: 'guia-remision-new.componente.html'
})
// tslint:disable-next-line:component-class-suffix
export class GuiaRemisionNewcomponent implements OnInit {
    public action: string;
    guia: GuiaRemision;
    notaspedidos: NotaPedido[];
    transportistas: Transportista[];
    private modalNotasRef: NgbModalRef;
    private modalTranspRef: NgbModalRef;
    private modalCamionRef: NgbModalRef;
    public query: string;
    private sub: any;
    private today: any = new Date();

    constructor(private modalService: NgbModal,
                private notapedidoService: NotaPedidoService,
                private transpService: TransportistaService,
                private guiaremisionService: GuiaRemisionService,
                private router: Router,
                private route: ActivatedRoute) {
        this.guia = <GuiaRemision> {
            carrier: [],
            date: `${this.today.getDate()}-${this.today.getMonth() + 1}-${this.today.getFullYear()}`
        };

        this.getNotas();
        this.getTransportistas();
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
        this.notapedidoService.getNotaPedidos()
                                .subscribe(
                                    data => {
                                        this.notaspedidos = data['data'];
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

    openNotaPedidoModal(content) {
        this.modalNotasRef = this.modalService.open(content);
    }

    addNotaPedido(nota: NotaPedido, index: number) {
        console.log('agregando');
    }

    openTransportistaModal(content) {
        this.modalTranspRef = this.modalService.open(content);
    }

    addTransportista(transportista: Transportista, index: number) {
        console.log('agregando');
    }

    openCamionModal(content) {
        this.modalCamionRef = this.modalService.open(content);
    }

}
