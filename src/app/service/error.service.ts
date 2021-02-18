import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error.name === 'HttpErrorResponse') {
      console.log(error);
      throw new Error(error);
    }
    else {
      const sendMessages = this.injector.get(EventService);
      console.log(error);
      sendMessages.announceSendMessage(error);
    }
  }

  constructor(private injector: Injector) { }
}
