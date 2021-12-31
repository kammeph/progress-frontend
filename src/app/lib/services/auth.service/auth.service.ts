import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../../app.models';
import { ApiBaseService } from '../api-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiBaseService{

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
      super(http, apiUrl, 'auth');
    }

  authenticate(username: string, password: string): Observable<Token> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    return this.http.post<Token>(`${this.apiUrl}/${this.prefix}/token`,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  refreshToken(token: string): Observable<Token> {
    const body = new HttpParams()
    .set('grant_type', 'refresh_token')
    .set('refresh_token', token);

    return this.http.post<Token>(`${this.apiUrl}/${this.prefix}/token`,
    body.toString(),
    {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${this.prefix}/register`,
      JSON.stringify({ username: username, password: password }));
  }
}
