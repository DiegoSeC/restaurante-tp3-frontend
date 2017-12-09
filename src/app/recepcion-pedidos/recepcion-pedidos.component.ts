import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NotaPedidoService } from "../providers/nota-pedido.service";
import { NotaPedido } from "../models/nota-pedido.model";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-recepcion-pedidos",
  templateUrl: "recepcion-pedidos.component.html"
})
export class RecepcionPedidosComponent {
  private modalNotaRef: NgbModalRef;

  public query: string;
  public checked: boolean;
  public model: string;

  public notaPedidos: NotaPedido[];
  public userWarehouse;

  public notaDetail: NotaPedido;
  public userName: string;

  constructor(
    private modalService: NgbModal,
    private notaServicio: NotaPedidoService,
    private cookieService: CookieService
  ) {
    this.userWarehouse = JSON.parse(this.cookieService.get("warehouse"));
    this.userName = this.cookieService.get('me');

    this.getNotaPedidos();
  }

  getNotaPedidos() {
    this.notaServicio.getNotaPedidos().subscribe(data => {
      this.notaPedidos = data["data"].filter(n => {
        return (
          n.status === "completed" &&
          n.warehouse.uuid === this.userWarehouse.uuid
        );
      });
    });
  }

  openNotaPedido(content, nota: NotaPedido) {
    this.notaServicio.getNotaPedido(nota.uuid).subscribe(data => {
      this.notaDetail = data['data'];
      this.modalNotaRef = this.modalService.open(content);
    });
    
  }
}
