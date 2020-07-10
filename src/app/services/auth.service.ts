import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../auth/user.model';

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

  user = new BehaviorSubject<User>(null);
  token: string = null;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDV_sKTRt2lgA3PyHALaogkH6j5BPmlzlI',
        {
          email,
          password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError),
        tap((resData) => {
          this.handleUserState(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV_sKTRt2lgA3PyHALaogkH6j5BPmlzlI',
        {
          email,
          password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError),
          tap((resData) => {
            this.handleUserState(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }



  private handleUserState( email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const newUser = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.token = newUser.token;
    this.user.next(newUser);
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
