import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user.model';
import { MessageService } from '../providers/message.service';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent {
  public user: User = <User> {};

  constructor(private cookieService: CookieService, 
              private messageService: MessageService,
              private router: Router) {
    this.goToApp();
  }

  goToApp() {
    this.cookieService.delete('auth', '1');
    this.messageService.sendMessage('logout');
    this.router.navigateByUrl('/');
  }
}