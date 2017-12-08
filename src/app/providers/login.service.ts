import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {
  url: string = 'http://165.227.183.138:8082';
  header = {};

  constructor(private $http: HttpClient, 
    public $cookie: CookieService) {
    
  }

  login(user: User) {
    return this.$http.post(`${this.url}/oauth/token`, {
      grant_type: "password",
      client_id: "2",
      client_secret: "SnJDLUXrBQvg32Zk6XBEGuc7gOOZucrUtaDIvOxV",
      username: user.user,
      password: user.password,
      scope: "*"
    });
  }

  me() {
    const authToken = this.$cookie.get('auth');
    
    this.header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${authToken}`),
    };
    
    return this.$http.get(`${this.url}/api/me`, this.header);
  }
}