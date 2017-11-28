import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudCotizacion } from '../models/solicitud-cotizacion.model';
import { NotaPedido as NotaPedidoInterface } from '../models/nota-pedido.model';
import { Producto } from '../models/producto.model';
import { Proveedor } from '../models/proveedor.model';
import { SolicitudCotizacionService } from '../providers/solicitud-cotizacion.service';
import { NotaPedidoService } from '../providers/nota-pedido.service';

import { ProductoService } from '../providers/producto.service';
import { ProveedorService } from '../providers/proveedor.service';

@Component({
    selector: 'app-solicitud-cotizacion-new',
    templateUrl: 'solicitud-cotizacion-new.component.html'
})
export class SolicitudCotizacionNewComponent implements OnInit, OnDestroy {
    public action: string;
    solicitud: SolicitudCotizacion;
    productos: Producto[];
    proveedores: Proveedor[];
    notaPedidos: NotaPedidoInterface[];
    notaPedido: NotaPedidoInterface = <NotaPedidoInterface> { document_number: '' };

    private modalProductoRef: NgbModalRef;
    private modalProveedoresRef: NgbModalRef;
    private modalSolicitudes: NgbModalRef;
    private modalNota: NgbModalRef;

    public query: string;
    private sub: any;
    private today: any = new Date();

    constructor(private modalService: NgbModal,
                private productoService: ProductoService,
                private proveedorService: ProveedorService,
                private solicitudService: SolicitudCotizacionService,
                private router: Router,
                private route: ActivatedRoute,
                private notaApi: NotaPedidoService) {
        /*Inicializar el objeto solicitud*/
        this.solicitud = <SolicitudCotizacion> {
            products: [],
            suppliers: [],
            date: `${this.today.getDate()}-${this.today.getMonth() + 1}-${this.today.getFullYear()}`
        };
        this.getProductos();
        this.getProveedores();
        this.getNotaPedidos();
        console.log('constructor');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                if (typeof params['id'] === 'undefined') {
                    this.setSolicitudDefault();
                } else {
                    this.getSolicitud(params['id']);
                }
          });
    }

    setSolicitudDefault() {
        this.action = 'registrar';
    }

    getNotaPedidos() {
        this.notaApi.getNotaPedidos().subscribe(data => {
            const n = data['data'];
            this.notaPedidos = n.filter(nota => nota.status === 'pending');
        });
    }

    getSolicitud(id: string) {
        this.action = 'actualizar';
        this.solicitudService.getOne(id)
                            .subscribe(
                                data => {
                                    console.log('getOne => ' + JSON.stringify(data));
                                    this.solicitud = data['data'];
                                },
                                error => {
                                    console.log(error);
                                }
                            );
    }

    getProductos() {
        this.productoService.getProductos()
                            .subscribe(
                                data => {
                                    console.log(data);
                                    this.productos = data['data'];
                                },
                                error => {
                                    console.log(error);
                                }
                            );
    }

    getProveedores() {
        this.proveedorService.getAll()
                            .subscribe(
                                data => {
                                    console.log(data);
                                    this.proveedores = data['data'];
                                },
                                error => {
                                    console.log(error);
                                }
                            );
    }

    openProductosModal(content) {
        this.modalProductoRef = this.modalService.open(content);
    }

    openProveedoresModal(content) {
        this.query = '';
        this.modalProveedoresRef = this.modalService.open(content);
    }

    openGuardarModal(content) {
        this.modalSolicitudes = this.modalService.open(content);
    }

    openNotaPedido(content) {
        this.modalNota = this.modalService.open(content);
    }

    addProducto(producto: Producto, index: number) {
        this.productos[index].disabled = true;
        this.solicitud.products.push(producto);
        this.modalProductoRef.close();
    }

    addProveedor(proveedor: Proveedor, index: number) {
        this.proveedores[index].disabled = true;
        this.solicitud.suppliers.push(proveedor);
        this.modalProveedoresRef.close();
    }

    getNotaPedido(nota: NotaPedidoInterface, index: number) {
        this.notaApi.getNotaPedido(nota.uuid).subscribe(data => {
            this.notaPedido = <NotaPedidoInterface> data['data'];
            this.solicitud.products = this.notaPedido.products;
            this.disableProducts();
            this.modalNota.close();
        });
    }

    quitarProducto(producto: Producto, index: number) {
        this.solicitud.products.splice(index, 1);
        this.productos.filter(p => {
            if (p.uuid === producto.uuid) {
                p.disabled = false;
            }
        });
    }

    quitarProveedor(proveedor: Proveedor, index: number) {
        this.solicitud.suppliers.splice(index, 1);
        this.proveedores.filter(p => {
            if (p.uuid === proveedor.uuid) {
                p.disabled = false;
            }
        });
    }

    onSubmit() {
        let action = this.createSolicitud();

        if (this.action === 'actualizar') {
            action = this.updateSolicitud();
        }

        action.subscribe(
            data => {
                if (this.action !== 'actualizar') {
                    this.solicitud.document_number = data['data']['document_number'];
                }

                this.modalSolicitudes.close();
            },
            error => {
                this.modalSolicitudes.close();
            }
        );

        this.modalSolicitudes.result.then(data => {
            this.router.navigateByUrl(`solicitud-cotizacion?id=${this.solicitud.document_number}`);
        });
    }

    createSolicitud() {
        return this.solicitudService.save(this.solicitud);
    }

    updateSolicitud() {
        return this.solicitudService.update(this.solicitud);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    disableProducts() {
        this.solicitud.products.forEach(p => {
            let index = this.productos.findIndex(prod => prod.uuid === p.uuid);
            this.productos[index].disabled = true;
        });
    }
}
