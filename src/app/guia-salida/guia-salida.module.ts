import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PipesModule } from '../pipes/pipes.module';

import { GuiaSalidaService } from '../providers/guia-salida.service';

import { GuiaSalidaComponent } from './guia-salida.component';
import {NewGuiaSalidaComponent} from './new-guia-salida.component';
@NgModule({
    declarations: [
        GuiaSalidaComponent,
        NewGuiaSalidaComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        RouterModule,
        PipesModule
     ],
    exports: [
        GuiaSalidaComponent
    ],
    providers: [
        GuiaSalidaService
    ]
})
export class GuiaSalidaModule {}
