import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthModel {
  key: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }
  signUp(email: string, password: string) {
    return this.http
      .post<AuthModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDV_sKTRt2lgA3PyHALaogkH6j5BPmlzlI',
        {
          email,
          password,
          returnSecureToken: true
        });
  }
}
