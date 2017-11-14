import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { PipesModule } from '../pipes/pipes.module';

import { SolicitudCotizacionService } from '../providers/solicitud-cotizacion.service';
import { ProveedorService } from '../providers/proveedor.service';

import { SolicitudCotizacionComponent } from './solicitud-cotizacion.component';
import { SolicitudCotizacionNewComponent } from './solicitud-cotizacion-new.component';


@NgModule({
    declarations: [
        SolicitudCotizacionComponent,
        SolicitudCotizacionNewComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        RouterModule,
        PipesModule
     ],
    exports: [
        SolicitudCotizacionComponent,
        SolicitudCotizacionNewComponent
    ],
    providers: [
        SolicitudCotizacionService
    ]
})
export class SolicitudCotizacionModule {}
