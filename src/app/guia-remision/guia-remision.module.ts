import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PipesModule } from '../pipes/pipes.module';

import { GuiaRemisionService } from '../providers/guia-remision.service';

import { GuiaRemisionComponent } from './guia-remision.component';
import { GuiaRemisionNewcomponent } from './guia-remision-new.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        GuiaRemisionComponent,
        GuiaRemisionNewcomponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PipesModule,
        NgbModule
     ],
    exports: [
        GuiaRemisionComponent,
        GuiaRemisionNewcomponent
    ],
    providers: [
        GuiaRemisionService,
        GuiaRemisionNewcomponent,
        CookieService
    ]
})
export class GuiaRemisionModule {}
