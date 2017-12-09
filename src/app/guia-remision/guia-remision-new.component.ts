import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { GuiaRemision } from "../models/guia-remision.model";
import { NotaPedido } from "../models/nota-pedido.model";
import { Transportista } from "../models/transportista.model";
import { Almacen } from "../models/almacen.model";
import { GuiaSalida } from "../models/guia-salida.model";

import { GuiaRemisionService } from "../providers/guia-remision.service";
import { NotaPedidoService } from "../providers/nota-pedido.service";
import { TransportistaService } from "../providers/transportista.service";
import { AlmacenService } from "../providers/almacen.service";
import { GuiaSalidaService } from "../providers/guia-salida.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-guia-remision-new",
  templateUrl: "guia-remision-new.componente.html"
})
// tslint:disable-next-line:component-class-suffix
export class GuiaRemisionNewcomponent implements OnInit {
  public action: string;
  guia: GuiaRemision;
  notaspedidos: NotaPedido[];
  guiassalida: GuiaSalida[];
  transportistas: Transportista[];
  almacenes: Almacen[];
  userName: string;
  private modalNotasRef: NgbModalRef;
  private modalTranspRef: NgbModalRef;
  private modalAlmacenRef: NgbModalRef;
  private modalSubmit: NgbModalRef;
  public query: string;
  private sub: any;
  private today: any = new Date();
  public trucks: any;
  userWarehouse: any;

  constructor(
    private modalService: NgbModal,
    private guiasalidaService: GuiaSalidaService,
    private transpService: TransportistaService,
    private almService: AlmacenService,
    private guiaremisionService: GuiaRemisionService,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) {
    this.guia = <GuiaRemision>{
      carrier: {},
      transfer_guide: {},
      date: `${this.today.getDate()}-${this.today.getMonth() +
        1}-${this.today.getFullYear()}`,
      warehouse_from: {},
      warehouse_to: {},
      truck: {}
    };

    this.getGuiaSalidas();
    this.getTransportistas();
    this.getAlmacenes();
    this.getMovilidad();

    this.userName = this.cookie.get("me");
    this.userWarehouse = JSON.parse(this.cookie.get('warehouse'));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (typeof params["id"] === "undefined") {
        this.setguiaDefault();
      } else {
        console.log("id => " + params["id"]);
        this.getGuia(params["id"]);
      }
    });
  }

  setguiaDefault() {
    this.action = "registrar";
  }

  getGuia(id: string) {
    this.action = "actualizar";
    this.guiaremisionService.getOne(id).subscribe(
      data => {
        this.guia = data["data"];
      },
      error => {
        console.log(error);
      }
    );
  }

  getGuiaSalidas() {
    this.guiasalidaService.getAll().subscribe(
      data => {
        const n = data["data"];
        this.guiassalida = n.filter(nota => nota.status === "active");
      },
      error => {
        console.log(error);
      }
    );
  }

  getTransportistas() {
    this.transpService.getAll().subscribe(
      data => {
        this.transportistas = data["data"];
      },
      error => {
        console.log(error);
      }
    );
  }

  getMovilidad() {
    this.transpService.getTrucks().subscribe(data => {
      this.trucks = data['data'];
    });
  }

  getAlmacenes() {
    this.almService.getAlmacenes().subscribe(
      data => {
        this.almacenes = data['data'].filter(a => a.uuid !== this.userWarehouse.uuid);
      },
      error => {
        console.log(error);
      }
    );
  }

  openGuiaSalidaModal(content) {
    this.modalNotasRef = this.modalService.open(content);
  }

  addGuiaSalida(guia: GuiaSalida, index: number) {
    this.guiasalidaService.getGuiaSalida(guia.uuid).subscribe(data => {
      const g = data["data"];

      this.guia.transfer_guide.document_number = g.document_number;
      this.guia.warehouse_from.code = g.warehouse_from.code;
      this.guia.warehouse_from.name = g.warehouse_from.name;
      this.guia.warehouse_to.code = g.warehouse_to.code;
      this.guia.warehouse_to.name = g.warehouse_to.name;

      this.guia.warehouse_from.uuid = g.warehouse_from.uuid;
      this.guia.warehouse_to.uuid = g.warehouse_to.uuid;

      this.guia.order = g.order.uuid;
      this.guia.products = g.products;
      this.guia.transfer_guide.uuid = g.uuid;

      this.modalNotasRef.dismiss();
    });
  }

  openTransportistaModal(content) {
    this.modalTranspRef = this.modalService.open(content);
  }

  addTransportista(transportista: Transportista, index: number) {
    this.guia.carrier.name = transportista.employee.name;
    this.guia.carrier.driver_license = transportista.driver_license;
    this.guia.carrier.uuid = transportista.uuid;
    this.modalTranspRef.dismiss();
  }

  openAlmacenModal(content) {
    this.modalAlmacenRef = this.modalService.open(content);
  }

  addAlmacen(almacen: Almacen, index: number) {
    this.guia.warehouse_to.code = almacen.code;
    this.modalAlmacenRef.dismiss();
  }

  openGuardarModal(content) {
    this.modalSubmit = this.modalService.open(content);
  }

  onSubmit() {
    this.modalSubmit.close();
    let action = this.guiaremisionService.save(this.guia);

    if (this.action === "actualizar") {
      action = this.guiaremisionService.update(this.guia);
    }

    action.subscribe(data => {
      this.modalSubmit.result.then(d => {
        this.router.navigateByUrl(`guia-remision`);
      });
    });
  }
}
