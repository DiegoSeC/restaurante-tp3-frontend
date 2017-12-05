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
import { LogoutComponent } from './login/logout.component';

export const routes: Routes = [
  { path: 'nota-pedido', component: NotaPedidoComponent, pathMatch: 'full' },
  { path: 'nota-pedido/new', component: NewNotaPedidoComponent, pathMatch: 'full' },
  { path: 'nota-pedido/edit/:id', component: NewNotaPedidoComponent, pathMatch: 'full' },
  { path: 'solicitud-cotizacion', component: SolicitudCotizacionComponent, pathMatch: 'full' },
  { path: 'solicitud-cotizacion/new', component: SolicitudCotizacionNewComponent, pathMatch: 'full' },
  { path: 'solicitud-cotizacion/edit/:id', component: SolicitudCotizacionNewComponent, pathMatch: 'full' },
  { path: 'guia-remision', component: GuiaRemisionComponent, pathMatch: 'full' },
  { path: 'guia-remision/new', component: GuiaRemisionNewcomponent, pathMatch: 'full' },
  { path: 'guia-remision/edit/:id', component: GuiaRemisionNewcomponent, pathMatch: 'full' },
  { path: 'guia-salida', component: GuiaSalidaComponent, pathMatch: 'full' },
  { path: 'guia-salida/new', component: NewGuiaSalidaComponent, pathMatch: 'full' },
  { path: 'guia-salida/edit/:id', component: NewGuiaSalidaComponent, pathMatch: 'full' },
  { path: 'recepcion-pedidos', component: RecepcionPedidosComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
