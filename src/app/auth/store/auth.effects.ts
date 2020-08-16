import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../user.model';
import * as authActions from './auth.action';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

export interface AuthModel {
  key?: string;
  idToken: string;
  email: string;
  refreshToken?: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {

  private handleUserState(resData: AuthModel) {
    console.log(resData);
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const newUser = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(newUser));
    return new authActions.LoginSuccess({
      id: resData.localId,
      email: resData.email,
      token: resData.idToken,
      expDate: expirationDate,
    });
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
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
    return of(new authActions.LoginFail(errorMessage));
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
          tap((resData) => {
            this.authService.setExpTimer(+resData.expiresIn * 1000);
          }),
          map(this.handleUserState),
          catchError(this.handleError)
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
          tap((resData) => {
            this.authService.setExpTimer(+resData.expiresIn * 1000);
          }),
          map(this.handleUserState),
          catchError(this.handleError)
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(authActions.AUTO_LOGIN),
    map(() => {
      const localData = localStorage.getItem('userData');
      if(!localData) {
        return {type: 'No Data'};
      }

      const userData: {
        id: string;
        email: string;
        _token: string;autoLogin
        _tokenExpirationDate: string;
      } = JSON.parse(localData);
      if (!userData._token) {
        return {type: 'No Data'};
      }
      let duration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      const lDate = new Date(userData._tokenExpirationDate);
      const lUser = new User(userData.email, userData.id, userData._token, lDate);
      this.authService.setExpTimer(duration);
      return new authActions.LoginSuccess({
        id: userData.id,
        email: userData.email,
        token: userData._token,
        expDate: new Date(userData._tokenExpirationDate),
      });
    })
  );

  @Effect({dispatch: false})
  logout = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearExpTimer();
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
