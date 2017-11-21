import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudCotizacion } from '../models/solicitud-cotizacion.model';
import { Producto } from '../models/producto.model';
import { Proveedor } from '../models/proveedor.model';
import { SolicitudCotizacionService } from '../providers/solicitud-cotizacion.service';

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
    private modalProductoRef: NgbModalRef;
    private modalProveedoresRef: NgbModalRef;
    private modalSolicitudes: NgbModalRef;

    public query: string;
    private sub: any;
    private today: any = new Date();

    constructor(private modalService: NgbModal,
                private productoService: ProductoService,
                private proveedorService: ProveedorService,
                private solicitudService: SolicitudCotizacionService,
                private router: Router,
                private route: ActivatedRoute) {
        /*Inicializar el objeto solicitud*/
        console.log(this.today);
        console.log(this.today.getDate());
        console.log(this.today.getMonth());
        console.log(this.today.getFullYear());
        this.solicitud = <SolicitudCotizacion> {
            productos: [],
            proveedores: [],
            date: `${this.today.getDate()}-${this.today.getMonth() + 1}-${this.today.getFullYear()}`
        };

        this.getProductos();
        this.getProveedores();
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

    addProducto(producto: Producto, index: number) {
        this.productos[index].disabled = true;
        this.solicitud.productos.push(producto);
        this.modalProductoRef.close();
    }

    addProveedor(proveedor: Proveedor, index: number) {
        this.proveedores[index].disabled = true;
        this.solicitud.proveedores.push(proveedor);
        this.modalProveedoresRef.close();
    }

    quitarProducto(producto: Producto, index: number) {
        this.solicitud.productos.splice(index, 1);
        this.productos.filter(p => {
            if (p.uuid === producto.uuid) {
                p.disabled = false;
            }
        });
    }

    quitarProveedor(proveedor: Proveedor, index: number) {
        this.solicitud.proveedores.splice(index, 1);
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
                    this.solicitud.numero = data['data']['numero'];
                }

                this.modalSolicitudes.close();
            },
            error => {
                this.modalSolicitudes.close();
            }
        );

        this.modalSolicitudes.result.then(data => {
            this.router.navigateByUrl(`solicitud-cotizacion?id=${this.solicitud.numero}`);
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
}
