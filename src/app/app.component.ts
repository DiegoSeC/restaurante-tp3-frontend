import { Component, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './providers/message.service';
import { MeService } from './providers/me.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'app';
  public showMenu: boolean;
  public subscription: Subscription;

  constructor(private cookieService: CookieService, 
              private messageService: MessageService,
              private router: Router,
              private meService: MeService) {
    this.showMenu = !!this.cookieService.get('auth');
    this.redirectToLogin();
    this.subscription = this.messageService.getMessage().subscribe(data => this.showMenu = !!this.cookieService.get('auth'));
  }

  redirectToLogin() {
    if (!this.showMenu) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
