import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private sendMessages = new Subject();
  announceSendMessages$ = this.sendMessages.asObservable();
  announceSendMessage(error: any) {
    this.sendMessages.next(error);
  }

  private checkAuth = new Subject();
  announceCheckAuth$ = this.checkAuth.asObservable();
  announceCheckAuth() {
    this.checkAuth.next();
  }
}
