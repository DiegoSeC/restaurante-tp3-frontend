import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudCotizacionComponent } from './solicitud-cotizacion.component';
import { SolicitudCotizacionNewComponent } from './solicitud-cotizacion-new.component';
import { SolicitudCotizacionService } from '../providers/solicitud-cotizacion.service';

@NgModule({
    declarations: [
        SolicitudCotizacionComponent,
        SolicitudCotizacionNewComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        RouterModule
     ],
    exports: [
        SolicitudCotizacionComponent
    ],
    providers: [
        SolicitudCotizacionService
    ]
})
export class SolicitudCotizacionModule {}
