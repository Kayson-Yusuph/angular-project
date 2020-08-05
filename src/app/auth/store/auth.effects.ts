import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
          catchError((errorRes) => {
            console.log('Error: ', errorRes);
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
          })
        );
    })
  );

  

  @Effect({ dispatch: false })
  loginSuccess = this.actions$.pipe(
    ofType(authActions.LOGIN_SUCCESS),
    tap(() => {
      console.log('Login success!');
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
