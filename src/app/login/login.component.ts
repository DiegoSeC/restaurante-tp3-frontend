import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user.model';
import { MessageService } from '../providers/message.service';
import { LoginService } from '../providers/login.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public user: User = <User> {};

  constructor(private cookieService: CookieService, 
              private messageService: MessageService,
              private router: Router,
              private loginService: LoginService) {}

  goToApp(user) {
    this.loginService.login(user).subscribe(data => {
      this.cookieService.set('auth', data['access_token']);
      this.messageService.sendMessage('login');
      this.getUserInfo();
    });
  }

  getUserInfo() {
    this.loginService.me().subscribe(data => {
      this.cookieService.set('me', data['data']['name']);
      this.router.navigateByUrl('nota-pedido');
    });
  }
}