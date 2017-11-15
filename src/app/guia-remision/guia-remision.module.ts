import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PipesModule } from '../pipes/pipes.module';

import { GuiaRemisionService } from '../providers/guia-remision.service';

import { GuiaRemisionComponent } from './guia-remision.component';

@NgModule({
    declarations: [
        GuiaRemisionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PipesModule
     ],
    exports: [
        GuiaRemisionComponent
    ],
    providers: [
        GuiaRemisionService
    ]
})
export class GuiaRemisionModule {}
