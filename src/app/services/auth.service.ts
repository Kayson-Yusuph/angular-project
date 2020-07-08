import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthModel {
  key: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
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
        }).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV_sKTRt2lgA3PyHALaogkH6j5BPmlzlI',
        {
          email,
          password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.error(errorRes);
    let errorMessage = 'An error occurred!';
    if (!errorRes ?.error ?.error ?.message) {
      throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account has been disabled!';
    }
    return throwError(errorMessage);
  }
}
