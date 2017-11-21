import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GuiaRemisionService } from '../providers/guia-remision.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GuiaRemision } from '../models/guia-remision.model';
import { error } from 'util';
import 'rxjs/RX';

@Component({
    selector: 'app-guia-remision',
    templateUrl: 'guia-remision.component.html',
    providers: [GuiaRemision]
})
export class GuiaRemisionComponent implements OnInit {
    guias: Array<any>= [];
    guiaNumero: String;
    guiaIndex: number;
    private modalNotaRef: NgbModalRef;
    private sub: any;
    anularAction: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private api: GuiaRemisionService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.guiaNumero = this.route.snapshot.queryParams['id'];
        this.getAllGuias();
    }

    goToForm(): void {
        this.router.navigateByUrl('guia-remision/new');
    }

    getAllGuias() {
        this.api.getAll()
        .subscribe(data => {
                    this.guias = data['data'];
                }
        );
    }

    openAnularModal(content, index) {
        this.guiaIndex = index;
        console.log(index);
        this.modalNotaRef = this.modalService.open(content);
    }

    anular() {
        const guia = this.guias[this.guiaIndex];
        this.guias[this.guiaIndex].status = 'Anulado';
        this.anularAction = true;

        this.api.cancel(guia.uuid)
            .subscribe(data => {
                this.modalNotaRef.close();
            // tslint:disable-next-line:no-shadowed-variable
            }, error => {
                this.modalNotaRef.close();
            });
    }
}
