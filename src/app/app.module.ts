import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AlmacenService } from './providers/almacen';
import { ProductoService } from './providers/producto';
import { NotaPedido } from './providers/nota-pedido';
import { Api } from './providers/api';

import { AppComponent } from './app.component';
import { NotaPedidoPageModule } from './nota-pedido/nota-pedido.module';
import { SolicitudCotizacionModule } from './solicitud-cotizacion/solicitud-cotizacion.module';

import { AppRoutingModule } from './app.route';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    NotaPedidoPageModule,
    SolicitudCotizacionModule,
    AppRoutingModule
  ],
  providers: [
    AlmacenService,
    ProductoService,
    NotaPedido,
    Api
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
