import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user.model';
import { MessageService } from '../providers/message.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public user: User = <User> {};

  constructor(private cookieService: CookieService, 
              private messageService: MessageService) {}

  goToApp() {
    this.cookieService.set('auth', '1');
    this.messageService.sendMessage('login');
  }
}