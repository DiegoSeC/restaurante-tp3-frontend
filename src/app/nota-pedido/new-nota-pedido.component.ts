import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AlmacenService } from '../providers/almacen.service';
import { ProductoService } from '../providers/producto.service';
import { NotaPedidoService } from '../providers/nota-pedido.service';
import { NotaPedido as NotaPedidoInterface } from '../models/nota-pedido.model';
import { Almacen as AlmacenInterface } from '../models/almacen.model';
import { Producto as ProductoInterface } from '../models/producto.model';

@Component({
  selector: 'app-new-nota-pedido',
  templateUrl: 'new-nota-pedido.component.html'
})
export class NewNotaPedidoComponent implements OnInit, OnDestroy {
  public action: string;
  public nota: NotaPedidoInterface;
  public almacenes: AlmacenInterface[];
  public productos: ProductoInterface[];
  private modalAlmacenRef: NgbModalRef;
  private modalProductoRef: NgbModalRef;
  private modalNotaRef: NgbModalRef;

  public query: string;
  private sub: any;
  public userName: string;

  public userWarehouse: any;

  constructor(private modalService: NgbModal,
              private almacen: AlmacenService,
              private producto: ProductoService,
              private notaApi: NotaPedidoService,
              private router: Router,
              private route: ActivatedRoute,
              private cookie: CookieService) {

    const date = new Date();
    this.nota = <NotaPedidoInterface> {
      products: [],
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      warehouse : {}
    };

    this.userName = this.cookie.get('me');
    this.userWarehouse = JSON.parse(this.cookie.get('warehouse'));

    this.getAlmacenes();
    this.getProductos();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (typeof params['id'] === 'undefined') {
        this.setDefaultNotaPedido();
      } else {
        this.getNotaPedido(params['id']);
      }
    });
  }

  setDefaultNotaPedido() {
    this.action = 'registrar';
  }

  getNotaPedido(uuid: string) {
    this.action = 'actualizar';
    this.notaApi.getNotaPedido(uuid).subscribe(data => {
      this.nota = data['data'];
    });
  }

  getAlmacenes() {
    this.almacen.getAlmacenes().subscribe(data => {
      this.almacenes = data['data'].filter(a => a.uuid !== this.userWarehouse.uuid);
    });
  }

  getProductos() {
    this.producto.getProductos().subscribe(data => {
      this.productos = data['data'];
    });
  }

  openAlmacenModal(content) {
    this.modalAlmacenRef = this.modalService.open(content);
  }

  openProductoModal(content) {
    this.query = '';
    this.modalProductoRef = this.modalService.open(content);
  }

  openGuardarModal(content) {
    this.modalNotaRef = this.modalService.open(content);
  }

  getAlmacen(almacen) {
    this.nota.warehouse = almacen;
    this.nota.warehouse.contact = almacen.contact_name;
    this.modalAlmacenRef.close();
  }

  getProducto(producto: ProductoInterface, index: number) {
    this.productos[index].disabled = true;
    this.nota.products.push(producto);
    this.modalProductoRef.close();
  }

  quitarProducto(producto: ProductoInterface, index: number) {
    this.nota.products.splice(index, 1);
    this.productos.filter(p => {
      if (p.uuid === producto.uuid) {
        p.disabled = false;
      }
    });
  }

  onSubmit() {
    let action = this.createNotaPedido();

    if (this.action === 'actualizar') {
      action = this.updateNotaPedido();
    }

    action.subscribe(data => {
      if (this.action !== 'actualizar') {
        this.nota.document_number = data['data']['document_number'];
      }

      this.modalNotaRef.close();
    }, error => this.modalNotaRef.close());

    this.modalNotaRef.result.then(data => {
      this.router.navigateByUrl(`nota-pedido?id=${this.nota.document_number}`);
    });
  }

  createNotaPedido() {
    return this.notaApi.saveNotaPedido(this.nota);
  }

  updateNotaPedido() {
    return this.notaApi.updateNotaPedido(this.nota);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
