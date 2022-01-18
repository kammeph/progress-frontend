import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from 'src/app/lib/services/api-base.service';
import { StrengthValue } from '../strength-value.models';

@Injectable({
  providedIn: 'root'
})
export class StrengthValueService extends ApiBaseService {

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    super(http, apiUrl, 'strength-values');
  }

  getAll(): Observable<StrengthValue[]> {
    return this.http.get<StrengthValue[]>(`${this.apiUrl}/${this.prefix}`);
  }

  update(strengthValues: StrengthValue[]): Observable<StrengthValue[]> {
    return this.http.put<StrengthValue[]>(`${this.apiUrl}/${this.prefix}`, strengthValues);
  }
}
