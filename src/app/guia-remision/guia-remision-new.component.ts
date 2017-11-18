import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiaRemision } from '../models/guia-remision.model';
import { NotaPedido } from '../models/nota-pedido.model';
import { Transportista } from '../models/transportista.model';

import { GuiaRemisionService } from '../providers/guia-remision.service';
import { NotaPedidoService } from '../providers/nota-pedido.service';

@Component({
    selector: 'app-guia-remision-new',
    templateUrl: 'guia-remision-new.componente.html'
})
// tslint:disable-next-line:component-class-suffix
export class GuiaRemisionNewcomponent {
    public action: string;
    guia: GuiaRemision;
    notaspedidos: NotaPedido[];
    transportistas: Transportista[];
    private modalNotasRef: NgbModalRef;
    private modalTranspRef: NgbModalRef;
    public query: string;
    private sub: any;
    private today: any = new Date();

}
