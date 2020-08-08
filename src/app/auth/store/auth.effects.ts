import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AuthModel } from '../auth.service';
import * as authActions from './auth.action';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthEffects {
  @Effect()
  loggingIn = this.actions$.pipe(
    ofType(authActions.LOGIN_START),
    switchMap((loginData: authActions.LoginStart) => {
      console.log('Login start');
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
          tap((data) => console.log('Tapped value', data)),
          map(this.handleLoginUserState),
          catchError((errorRes: HttpErrorResponse) => {
            const error = this.handleError(errorRes);
            return of( new authActions.LoginFail(error));
          })
        );
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
            return of( new authActions.LoginFail(error));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess = this.actions$.pipe(
    ofType(authActions.LOGIN_SUCCESS, authActions.SIGN_UP_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(authActions.AUTO_LOGIN),
    map(() => {
      console.log('Here');
      const localData = localStorage.getItem('userData');
      console.log(localData);
    if (!localData) {
      return of();
    }
    const data: {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localData);
    if (!data._token) {
      return of();
    }
    let duration =
      new Date(data._tokenExpirationDate).getTime() - new Date().getTime();
    const userData: AuthModel = {
      localId: data.id,
      idToken: data.id,
      expiresIn: '' + duration,
      email: data.email,
    }
    this.handleLoginUserState(userData);
    const expTime = 10 * 60 * 1000;
    if (duration > expTime) {
      duration = expTime;
    }
    // this.autoLogout(duration);
  }
),
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  private handleLoginUserState(resData: AuthModel) {
    console.log(resData);
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    return new authActions.LoginSuccess({
      id: resData.localId,
      email: resData.email,
      token: resData.idToken,
      expDate: expirationDate,
    });
  }

  private handleSignUpUserState(resData: AuthModel) {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    return new authActions.SignUpSuccess({
      id: resData.localId,
      email: resData.email,
      token: resData.idToken,
      expDate: expirationDate,
    });
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
}
