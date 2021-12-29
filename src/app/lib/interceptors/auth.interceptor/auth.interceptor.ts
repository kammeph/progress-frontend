import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenService } from '../../services/token.service/token.service';
import { RefreshToken } from 'src/app/store/app.action';
import { Store } from '@ngxs/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
    private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    return next.handle(this.addTokenHeader(request)).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401 && request.url != '/api/auth/token') {
          return this.store.dispatch(new RefreshToken()).pipe(
            switchMap(() => next.handle(this.addTokenHeader(request)))
          );
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  addTokenHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getToken();
    if (token && request.url !== '/api/auth/token') {
      request = request.clone({ headers: request.headers.set('Authorization', "Bearer " + token) });
    }
    return request;
  }
}
