import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LoginComponent } from './login.component';

import { PipesModule } from '../pipes/pipes.module';
import { LogoutComponent } from './logout.component';

import { LoginService } from '../providers/login.service';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    LoginComponent,
    LogoutComponent
  ],
  providers: [
    CookieService,
    LoginService
  ]
})
export class LoginModule {

}
