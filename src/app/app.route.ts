import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaPedidoPage } from './nota-pedido/nota-pedido';
import { NewNotaPedidoPage } from './nota-pedido/new-nota-pedido';
import { SolicitudCotizacionComponent } from './solicitud-cotizacion/solicitud-cotizacion.component';
import { SolicitudCotizacionNewComponent } from './solicitud-cotizacion/solicitud-cotizacion-new.component';

export const routes: Routes = [
  { path: 'nota-pedido', component: NotaPedidoPage },
  { path: 'nota-pedido/new', component: NewNotaPedidoPage },
  { path: 'nota-pedido/edit/:id', component: NewNotaPedidoPage },
  { path: 'solicitud-cotizacion', component: SolicitudCotizacionComponent },
  { path: 'solicitud-cotizacion/new', component: SolicitudCotizacionNewComponent },
  { path: 'solicitud-cotizacion/edit/:id', component: SolicitudCotizacionNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
