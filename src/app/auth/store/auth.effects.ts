import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import * as authActions from './auth.action';
import { environment } from '../../../environments/environment';
import { AuthModel } from '../auth.service';

@Injectable()
export class AuthEffects {
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
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new authActions.LoginSuccess({
              id: resData.localId,
              email: resData.email,
              token: resData.idToken,
              expDate: expirationDate,
            });
          }),
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
          map((resData) => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return new authActions.SignUpSuccess({
              id: resData.localId,
              email: resData.email,
              token: resData.idToken,
              expDate: expirationDate,
            });;
          }),
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

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  private handleUserState(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // const newUser = new User(email, userId, token, expirationDate);
    // this.token = newUser.token;
    // this.autoLogout(expiresIn * 1000);
    // this.user.next(newUser);
      return new authActions.LoginSuccess({
        id: userId,
        email,
        token,
        expDate: new Date(new Date().getTime() + expiresIn * 1000),
      });
    // localStorage.setItem('userData', JSON.stringify(newUser));
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
