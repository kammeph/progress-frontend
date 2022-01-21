import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private ACCESS_TOKEN_KEY = 'TOKEN';
  private REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

  constructor() {}

  getToken() {
    return window.sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setToken(token: string) {
    window.sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  clearToken() {
    window.sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken() {
    return window.sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setRefreshToken(token: string) {
    window.sessionStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  clearRefreshToken() {
    window.sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}
