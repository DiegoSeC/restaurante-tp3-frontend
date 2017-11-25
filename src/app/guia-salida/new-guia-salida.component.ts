import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { GuiaSalidaService } from '../providers/guia-salida.service';
import { GuiaSalida as GuiaSalidaInterface } from '../models/guia-salida.model';
import { NotaPedido as NotaPedidoInterface } from '../models/nota-pedido.model';
import { NotaPedidoService } from '../providers/nota-pedido.service';


@Component({
    selector: 'app-new-guia-salida',
    templateUrl: 'new-guia-salida.component.html'
  })

export class NewGuiaSalidaComponent implements OnInit, OnDestroy {
  public action: string;
  public guiasalida: GuiaSalidaInterface;
  public notapedidos: NotaPedidoInterface[];
  private modalNotaRef: NgbModalRef;

  public query: string;
  private sub: any;
  private today: any = new Date();

  constructor(private modalService: NgbModal,
              private guiaApi: GuiaSalidaService,
              private notaPedido: NotaPedidoService,
              private router: Router,
              private route: ActivatedRoute){

    const date = new Date();

    this.guiasalida = <GuiaSalidaInterface> {
      products: [],
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      order: {}
    };

    this.getNotaPedidos();

  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      if (typeof params['id'] === 'undefined') {
        this.setDefaultGuiaSalida();
      } else {
        this.getGuiaSalida(params['id']);
      }
    });
  };

  ngOnDestroy(){
    this.sub.unsubscribe();
  };

  setDefaultGuiaSalida() {
    this.action = 'registrar';
  }

  getGuiaSalida(uuid: string) {
    this.action = 'actualizar';
    this.guiaApi.getGuiaSalida(uuid).subscribe(data => {
      this.guiasalida = data['data'];
    });
  }

  openNotaPedidoModal(content) {
    this.query = '';
    this.modalNotaRef = this.modalService.open(content);
  }

  openGuardarModal(content) {
    
  }

  getNotaPedidos() {
    this.notaPedido.getNotaPedidos().subscribe(data => {
      this.notapedidos = data['data'];
    });
  }

  getNotaPedido(notaPedido: NotaPedidoInterface) {
    this.notaPedido.getNotaPedido(notaPedido.uuid).subscribe(data => {
      const np = data['data'];
      this.guiasalida.order.document_number= np.document_number;
      this.guiasalida.almacen_origen = np.warehouse.name;
      this.guiasalida.direccion =  np.warehouse.address;
      this.guiasalida.products =np.products;
      this.modalNotaRef.close();

    });
  }



  onSubmit() {
    let action = this.createGuiaSalida();

    if (this.action === 'actualizar') {
      action = this.updateGuiaSalida();
    }

    action.subscribe(data => {
      if (this.action !== 'actualizar') {
        this.guiasalida.document_number = data['data']['numero'];
      }

      this.modalNotaRef.close();
    }, error => this.modalNotaRef.close());

    this.modalNotaRef.result.then(data => {
      this.router.navigateByUrl(`guia-salida?id=${this.guiasalida.document_number}`);
    });
  }

  createGuiaSalida() {
    return this.guiaApi.saveGuiaSalida(this.guiasalida);
  }

  updateGuiaSalida() {
    return this.guiaApi.updateGuiaSalida(this.guiasalida);
  }

}