import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body) {
          let newBody = {} as { [key: string]: any };
          for (var prop in event.body) {
            let key = (prop as string).split('_').map(value => value.charAt(0).toUpperCase() + value.slice(1)).join('');
            key = key.charAt(0).toLowerCase() + key.slice(1);
            newBody[key] = event.body[prop];
          }
          const modEvent = event.clone({ body: newBody });
          return modEvent;
        }
        return event;
      })
    );
  }
}
