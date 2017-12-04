import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recepcion-pedidos',
  templateUrl: 'recepcion-pedidos.component.html'
})
export class RecepcionPedidosComponent {
  private modalNotaRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}
  
  openNotaPedido(content) {
    this.modalNotaRef = this.modalService.open(content);
  }
}