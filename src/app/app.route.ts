import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaPedidoComponent } from './nota-pedido/nota-pedido.component';
import { NewNotaPedidoComponent } from './nota-pedido/new-nota-pedido.component';
import { SolicitudCotizacionComponent } from './solicitud-cotizacion/solicitud-cotizacion.component';
import { SolicitudCotizacionNewComponent } from './solicitud-cotizacion/solicitud-cotizacion-new.component';
import { GuiaRemisionComponent } from './guia-remision/guia-remision.component';
import { GuiaRemisionNewcomponent } from './guia-remision/guia-remision-new.component';
import { GuiaSalidaComponent } from './guia-salida/guia-salida.component';

export const routes: Routes = [
  { path: 'nota-pedido', component: NotaPedidoComponent },
  { path: 'nota-pedido/new', component: NewNotaPedidoComponent },
  { path: 'nota-pedido/edit/:id', component: NewNotaPedidoComponent },
  { path: 'solicitud-cotizacion', component: SolicitudCotizacionComponent },
  { path: 'solicitud-cotizacion/new', component: SolicitudCotizacionNewComponent },
  { path: 'solicitud-cotizacion/edit/:id', component: SolicitudCotizacionNewComponent },
  { path: 'guia-remision', component: GuiaRemisionComponent },
  { path: 'guia-remision/new', component: GuiaRemisionNewcomponent },
  { path: 'guia-salida', component: GuiaSalidaComponent },
  { path: 'guia-salida/new', component: GuiaSalidaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
