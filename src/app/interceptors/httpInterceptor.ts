import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor() { }
  // function which will be called for all http calls
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // how to update the request Parameters
    const token = localStorage.getItem('token');

    if (token) {
      const updatedRequest = request.clone({
        headers: request.headers.set('authToken', token)
      });
      return next.handle(updatedRequest);
    }
    return next.handle(request);
  }
}
