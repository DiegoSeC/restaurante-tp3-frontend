import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { RecepcionPedidosComponent } from './recepcion-pedidos.component';
// import { NewNotaPedidoComponent } from './new-nota-pedido.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    RecepcionPedidosComponent
    //NewNotaPedidoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    RecepcionPedidosComponent
    //NewNotaPedidoComponent
  ]
})
export class RecepcionPedidosModule {

}
