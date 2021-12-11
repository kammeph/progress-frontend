import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../../app.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<Token> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<Token>('/api/auth',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/register', JSON.stringify({ username: username, password: password }));
  }
}
