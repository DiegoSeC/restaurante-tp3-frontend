import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { NotaPedidoComponent } from './nota-pedido.component';
import { NewNotaPedidoComponent } from './new-nota-pedido.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    NotaPedidoComponent,
    NewNotaPedidoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    NotaPedidoComponent,
    NewNotaPedidoComponent
  ],
  providers: [
    CookieService
  ]
})
export class NotaPedidoModule {

}
