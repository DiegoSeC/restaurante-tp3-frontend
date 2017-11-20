import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuiaRemisionService } from '../providers/guia-remision.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GuiaRemision } from '../models/guia-remision.model';
import { error } from 'util';

@Component({
    selector: 'app-guia-remision',
    templateUrl: 'guia-remision.component.html',
    providers: [GuiaRemision]
})
export class GuiaRemisionComponent implements OnInit {
    guias: Array<any>;
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
        this.getAllGuias().then( (data) => {
            this.guias = data;
        // tslint:disable-next-line:no-shadowed-variable
        }).catch( (error) => {
            console.log(error);
        });
    }

    goToForm(): void {
        this.router.navigateByUrl('guia-remision/new');
    }

    getAllGuias() {
        return this.api.getAll()
                .then(
                    (data) => data,
                    // tslint:disable-next-line:no-shadowed-variable
                    (error) => {
                        console.log('Error: ' + JSON.stringify(error));
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
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.modalNotaRef.close();
            });
    }
}
