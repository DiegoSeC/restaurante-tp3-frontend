import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { NotaPedidoService } from '../providers/nota-pedido.service';
import { NotaPedido as NotaPedidoInterface } from '../models/nota-pedido.model';

@Component({
  selector: 'app-nota-pedido',
  templateUrl: 'nota-pedido.component.html'
})
export class NotaPedidoComponent implements OnInit {
  public notaPedidos: NotaPedidoInterface[] = [];
  private modalNotaRef: NgbModalRef;
  private notaIndex: number;
  public notaNumero: string;
  private sub: any;
  private anularAction: boolean;

  constructor(private router: Router,
              private notaApi: NotaPedidoService,
              private route: ActivatedRoute,
              private modalService: NgbModal) {
    this.getNotaPedidos();
  }

  ngOnInit() {
    this.notaNumero = this.route.snapshot.queryParams['id'];
  }

  goToForm() {
    this.router.navigateByUrl('nota-pedido/new');
  }

  getNotaPedidos() {
    this.notaApi.getNotaPedidos()
                .subscribe(data => {
                  /*console.log(data);*/
                  this.notaPedidos = data['data'];
                });
  }

  openAnularModal(content, index) {
    this.notaIndex = index;
    this.modalNotaRef = this.modalService.open(content);
  }

  anular() {
    const nota = this.notaPedidos[this.notaIndex];
    this.notaPedidos[this.notaIndex].status = 'Anulado';
    this.anularAction = true;

    this.notaApi.anularNotaPedido(nota.uuid).subscribe(data => {
      this.modalNotaRef.close();
    }, error => {
      this.modalNotaRef.close();
    });
  }
}
