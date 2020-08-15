import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../user.model';
import { AuthModel } from '../auth.service';
import * as authActions from './auth.action';
import { environment } from '../../../environments/environment';
import { TestBed } from '@angular/core/testing';

@Injectable()
export class AuthEffects {
  private expirationTimer: any;

  private handleLoginUserState(resData: AuthModel) {
    console.log(resData);
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const newUser = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    return new authActions.LoginSuccess({
      id: resData.localId,
      email: resData.email,
      token: resData.idToken,
      expDate: expirationDate,
    });
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  private handleSignUpUserState(resData: AuthModel) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const newUser = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    return new authActions.SignUpSuccess({
      id: resData.localId,
      email: resData.email,
      token: resData.idToken,
      expDate: expirationDate,
    });
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    if (
      errorRes.error &&
      errorRes.error.error &&
      errorRes.error.error.message
    ) {
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
    }
    return errorMessage;
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.store.di
    }, expirationDuration);
  }

  @Effect({ dispatch: false })
  loginSuccess = this.actions$.pipe(
    ofType(authActions.LOGIN_SUCCESS, authActions.SIGN_UP_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  signingUp = this.actions$.pipe(
    ofType(authActions.SIGN_UP_START),
    switchMap((signUpData: authActions.SignUpStart) => {
      const { email, password } = signUpData.payload;
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
          map(this.handleSignUpUserState),
          catchError((errorRes: HttpErrorResponse) => {
            const error = this.handleError(errorRes);
            return of(new authActions.LoginFail(error));
          })
        );
    })
  );

  @Effect()
  loggingIn = this.actions$.pipe(
    ofType(authActions.LOGIN_START),
    switchMap((loginData: authActions.LoginStart) => {
      return this.http
        .post<AuthModel>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          {
            email: loginData.payload.email,
            password: loginData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          // tap((data) => console.log('Tapped value', data)),
          map(this.handleLoginUserState),
          catchError((errorRes: HttpErrorResponse) => {
            const error = this.handleError(errorRes);
            return of(new authActions.LoginFail(error));
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(authActions.AUTO_LOGIN),
    switchMap((userRes: authActions.AutoLogin) => {
      const localData = localStorage.getItem('userData');
      if(!localData) {
        return of();
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
      return of(new authActions.LoginSuccess({
        id: userData.id,
        email: userData.email,
        token: userData._token,
        expDate: new Date(userData._tokenExpirationDate),
      }));
    })
  );

  logout = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    switchMap((resData: authActions.Logout) => {
      return of(new authActions.Logout());
      if(this.expirationTimer) {
        clearTimeout(this.expirationTimer);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
