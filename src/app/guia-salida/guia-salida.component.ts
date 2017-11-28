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

    // Pagination
    public page = 1;
    public totalItems = 0;
    private localGuiaSalida: Array<GuiaSalidaInterface[]> = [];

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
            const guias = data['data'];
            let i, j, temparray, chunk = 10;
            for (i = 0, j = guias.length; i < j; i += chunk) {
                temparray = guias.slice(i,i+chunk);
                this.localGuiaSalida.push(temparray);
            }
      
            this.guiaSalidas = this.localGuiaSalida[0];
            this.totalItems = guias.length;
        });
    }

    getPagination(e) {
        this.guiaSalidas = this.localGuiaSalida[e - 1];
    }

    openAnularModal(content, index) {
        this.guiaIndex = index;
        this.modalGuiaRef = this.modalService.open(content);
    }

    anular() {
        const nota = this.guiaSalidas[this.guiaIndex];
        //this.guiaSalidas[this.guiaIndex].status = 'inactive';
        this.anularAction = true;
    
        
        this.guiaApi.anularGuiaSalida(nota.uuid).subscribe(data => {
          this.modalGuiaRef.close();
          this.getGuiaSalidas();
        }, error => {
          this.modalGuiaRef.close();
            console.info("error");
        });
      }
}
