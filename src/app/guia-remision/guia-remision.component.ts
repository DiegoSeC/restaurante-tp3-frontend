import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuiaRemisionService } from '../providers/guia-remision.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GuiaRemision } from '../models/guia-remision.model';
import { error } from 'util';

@Component({
    selector: 'app-guia-remision',
    templateUrl: 'guia-remision.component.html'
})
export class GuiaRemisionComponent implements OnInit {
    guias: GuiaRemision[];
    guiaNumero: String;
    guiaIndex: number;
    private modalNotaRef: NgbModalRef;
    private sub: any;
    anularAction: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private api: GuiaRemisionService,
                private modalService: NgbModal) {
                    this.getAllGuias();
    }

    ngOnInit() {
        this.guiaNumero = this.route.snapshot.queryParams['id'];
    }

    goToForm(): void {
        this.router.navigateByUrl('guia-remision/new');
    }

    getAllGuias() {
        this.api.getAll()
                .subscribe(data => {
                    this.guias = data['data'];
                });
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
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.modalNotaRef.close();
            });
    }
}
