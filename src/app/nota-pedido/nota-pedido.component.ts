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
  public notaNumero: number;
  private sub: any;
  private anularAction: boolean;
  // Pagination
  public page = 1;
  public totalItems = 0;
  private localNotaPedidos: Array<NotaPedidoInterface[]> = [];

  constructor(private router: Router,
              private notaApi: NotaPedidoService,
              private route: ActivatedRoute,
              private modalService: NgbModal) {
    this.getNotaPedidos();
  }

  ngOnInit() {
    if(typeof this.route.snapshot.queryParams['id'] !== 'undefined') {
      this.notaNumero = this.route.snapshot.queryParams['id'];
    }
  }

  goToForm() {
    this.router.navigateByUrl('nota-pedido/new');
  }

  getNotaPedidos() {
    this.notaApi.getNotaPedidos().subscribe(data => {
      const notaPedidos = data['data'];
      let i, j, temparray, chunk = 10;
      for (i = 0, j = notaPedidos.length; i < j; i += chunk) {
          temparray = notaPedidos.slice(i,i+chunk);
          this.localNotaPedidos.push(temparray);
      }

      this.notaPedidos = this.localNotaPedidos[0];
      this.totalItems = notaPedidos.length;
    });
  }

  getPagination(e) {
    this.notaPedidos = this.localNotaPedidos[e - 1];
  }

  openAnularModal(content, index) {
    this.notaIndex = index;
    this.modalNotaRef = this.modalService.open(content);
  }

  anular() {
    const nota = this.notaPedidos[this.notaIndex];
    this.notaPedidos[this.notaIndex].status = 'canceled';
    this.anularAction = true;

    this.notaApi.anularNotaPedido(nota.uuid).subscribe(data => {
      this.modalNotaRef.close();
    }, error => {
      this.modalNotaRef.close();
    });
  }
}
