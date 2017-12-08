import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {
  url: string = 'http://165.227.183.138:8082';

  constructor(private $http: HttpClient) {}

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
}