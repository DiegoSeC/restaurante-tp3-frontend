import { Component, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './providers/message.service';

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
              private messageService: MessageService) {
    this.showMenu = !!this.cookieService.get('auth')
    this.subscription = this.messageService.getMessage().subscribe(data => this.showMenu = !!this.cookieService.get('auth'));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
