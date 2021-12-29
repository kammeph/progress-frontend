import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/app.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private prefix = 'users';

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) { }

  getMe() : Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${this.prefix}/get/me`);
  }
}
