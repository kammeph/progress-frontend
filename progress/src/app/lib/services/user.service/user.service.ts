import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/app.models';
import { ApiBaseService } from '../api-base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiBaseService {
  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    super(http, apiUrl, 'users');
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${this.prefix}/get/me`);
  }
}
