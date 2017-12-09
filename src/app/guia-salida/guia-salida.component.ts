import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { GuiaSalidaService } from '../providers/guia-salida.service';
import { GuiaSalida as GuiaSalidaInterface } from '../models/guia-salida.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-guia-salida',
  templateUrl: 'guia-salida.component.html'
})
export class GuiaSalidaComponent implements OnInit {
  public guiaSalidas: GuiaSalidaInterface[] = [];
  private modalGuiaRef: NgbModalRef;
  private guiaIndex: number;
  public guiaNumero: string;
  private sub: any;
  public anularAction: boolean;

  // Pagination
  public page = 1;
  public totalItems = 0;
  private localGuiaSalida: Array<GuiaSalidaInterface[]> = [];

  public query: string;
  public checked: boolean;
  public userName: string;

  public guiaNumeroNuevo: string;

  constructor(
    private router: Router,
    private guiaApi: GuiaSalidaService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private cookie: CookieService
  ) {
    this.getGuiaSalidas();
    this.userName = this.cookie.get('me');
  }

  ngOnInit() {
    if(typeof this.route.snapshot.queryParams['id'] !== 'undefined') {
      this.guiaNumero = this.route.snapshot.queryParams['id'];
    }
  }

  goToForm() {
    this.router.navigateByUrl('guia-salida/new');
  }

  getGuiaSalidas() {
    this.guiaApi.getGuiaSalidas().subscribe(data => {
      const guias = data['data'];
      let i,
        j,
        temparray,
        chunk = 10;
      for (i = 0, j = guias.length; i < j; i += chunk) {
        temparray = guias.slice(i, i + chunk);
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
    const guia_salida = this.guiaSalidas[this.guiaIndex];
    this.guiaSalidas[this.guiaIndex].status = 'inactive';
    this.anularAction = true;

    this.guiaApi.anularGuiaSalida(guia_salida.uuid).subscribe(
      data => {
        this.modalGuiaRef.close();
        console.info('ELIMINADO');
      },
      error => {
        this.modalGuiaRef.close();
        console.info('error');
      }
    );
  }
}
