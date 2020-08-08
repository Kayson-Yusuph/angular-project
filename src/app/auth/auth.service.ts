import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '../auth/user.model';
import { environment } from '../../environments/environment';
import * as appStore from '../store/app.reducers';
import * as authActions from '../auth/store/auth.action';

export interface AuthModel {
  key?: string;
  idToken: string;
  email: string;
  refreshToken?: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  token: string = null;
  private expirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<appStore.AppState>
  ) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthModel>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleUserState(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthModel>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleUserState(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const localData = localStorage.getItem('userData');
    if (!localData) {
      return;
    }
    const userData: {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localData);
    if (!userData._token) {
      return;
    }
    let duration =
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    const lDate = new Date(userData._tokenExpirationDate);
    const lUser = new User(userData.email, userData.id, userData._token, lDate);
    this.store.dispatch(
      new authActions.LoginSuccess({
        id: userData.id,
        email: userData.email,
        token: userData._token,
        expDate: new Date(userData._tokenExpirationDate),
      })
    );
    // this.user.next(lUser);
    const expTime = 10 * 60 * 1000;
    if (duration > expTime) {
      duration = expTime;
    }
    this.autoLogout(duration);
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleUserState(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(email, userId, token, expirationDate);
    this.token = newUser.token;
    this.autoLogout(expiresIn * 1000);
    // this.user.next(newUser);
    this.store.dispatch(
      new authActions.LoginSuccess({
        id: userId,
        email,
        token,
        expDate: new Date(new Date().getTime() + expiresIn * 1000),
      })
    );
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.error(errorRes);
    let errorMessage = 'An error occurred!';
    if (
      errorRes.error &&
      errorRes.error.error &&
      errorRes.error.error.message
    ) {
      return throwError(errorMessage);
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
