import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { GuiaSalidaService } from '../providers/guia-salida.service';
import { GuiaSalida as GuiaSalidaInterface } from '../models/guia-salida.model';

@Component({
    selector: 'app-guia-salida',
    templateUrl: 'guia-salida.component.html'
})
export class GuiaSalidaComponent implements OnInit   {

    public guiaSalidas: GuiaSalidaInterface[] = [];
    private modalGuiaRef: NgbModalRef;
    private guiaIndex: number;
    public guiaNumero: string;
    private sub: any;
    private anularAction: boolean;

    constructor(private router: Router,
        private guiaApi: GuiaSalidaService,
        private route: ActivatedRoute,
        private modalService: NgbModal) {
        this.getGuiaSalidas();
    }

    ngOnInit() {
        this.guiaNumero = this.route.snapshot.queryParams['id'];
    }

    goToForm() {
        this.router.navigateByUrl('guia-salida/new');
    }
    
    getGuiaSalidas() {
        this.guiaApi.getGuiaSalidas().subscribe(data => {
          this.guiaSalidas = data['data'];
        });
      }
      openAnularModal(content, index) {
        this.guiaIndex = index;
        this.modalGuiaRef = this.modalService.open(content);
      }    
}
