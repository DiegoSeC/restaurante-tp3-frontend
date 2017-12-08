import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user.model';
 
@Injectable()
export class MeService {
  private subject = new Subject<any>();

  sendMessage(user: User) {
    this.subject.next({ user: user });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}