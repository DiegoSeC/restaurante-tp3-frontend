import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaPedidoComponent } from './nota-pedido/nota-pedido.component';
import { NewNotaPedidoComponent } from './nota-pedido/new-nota-pedido.component';
import { SolicitudCotizacionComponent } from './solicitud-cotizacion/solicitud-cotizacion.component';
import { SolicitudCotizacionNewComponent } from './solicitud-cotizacion/solicitud-cotizacion-new.component';
import { GuiaRemisionComponent } from './guia-remision/guia-remision.component';
import { GuiaRemisionNewcomponent } from './guia-remision/guia-remision-new.component';
import { GuiaSalidaComponent } from './guia-salida/guia-salida.component';
import { NewGuiaSalidaComponent } from './guia-salida/new-guia-salida.component';
import { RecepcionPedidosComponent } from './recepcion-pedidos/recepcion-pedidos.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'nota-pedido', component: NotaPedidoComponent },
  { path: 'nota-pedido/new', component: NewNotaPedidoComponent },
  { path: 'nota-pedido/edit/:id', component: NewNotaPedidoComponent },
  { path: 'solicitud-cotizacion', component: SolicitudCotizacionComponent },
  { path: 'solicitud-cotizacion/new', component: SolicitudCotizacionNewComponent },
  { path: 'solicitud-cotizacion/edit/:id', component: SolicitudCotizacionNewComponent },
  { path: 'guia-remision', component: GuiaRemisionComponent },
  { path: 'guia-remision/new', component: GuiaRemisionNewcomponent },
  { path: 'guia-remision/edit/:id', component: GuiaRemisionNewcomponent },
  { path: 'guia-salida', component: GuiaSalidaComponent },
  { path: 'guia-salida/new', component: NewGuiaSalidaComponent },
  { path: 'guia-salida/edit/:id', component: NewGuiaSalidaComponent },
  { path: 'recepcion-pedidos', component: RecepcionPedidosComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
