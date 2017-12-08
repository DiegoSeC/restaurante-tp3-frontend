import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiService {
  url: string = 'http://165.227.183.138:8082/api';
  //url: string = 'http://localhost:4200/assets/mockups';
  header = {};

  constructor(public http: HttpClient,
              public $cookie: CookieService) {
    const authToken = this.$cookie.get('auth');

    this.header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${authToken}`),
    };
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    reqOpts = this.setHeaders(reqOpts);

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.setHeaders(reqOpts);
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.setHeaders(reqOpts);
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    reqOpts = this.setHeaders(reqOpts);
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.setHeaders(reqOpts);
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  setHeaders(req) {
    return Object.assign(this.header, req);
  }
}
