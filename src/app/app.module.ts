import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AlmacenService } from './providers/almacen.service';
import { ApiService } from './providers/api.service';
import { NotaPedidoService } from './providers/nota-pedido.service';
import { GuiaRemisionService } from './providers/guia-remision.service';
import { ProductoService } from './providers/producto.service';
import { ProveedorService } from './providers/proveedor.service';
import { TransportistaService } from './providers/transportista.service';
import { CamionService } from './providers/camion.service';
import { MessageService } from './providers/message.service';
import { LoginService } from './providers/login.service';

import { AppComponent } from './app.component';
import { NotaPedidoModule } from './nota-pedido/nota-pedido.module';
import { SolicitudCotizacionModule } from './solicitud-cotizacion/solicitud-cotizacion.module';
import { GuiaRemisionModule } from './guia-remision/guia-remision.module';
import { GuiaSalidaModule } from './guia-salida/guia-salida.module';
import { RecepcionPedidosModule } from './recepcion-pedidos/recepcion-pedidos.module';
import { LoginModule } from './login/login.module';

import { AppRoutingModule } from './app.route';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    NotaPedidoModule,
    SolicitudCotizacionModule,
    GuiaRemisionModule,
    GuiaSalidaModule,
    RecepcionPedidosModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [
    HttpModule,
    AlmacenService,
    ProductoService,
    NotaPedidoService,
    GuiaRemisionService,
    ApiService,
    ProveedorService,
    TransportistaService,
    CamionService,
    CookieService,
    MessageService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
