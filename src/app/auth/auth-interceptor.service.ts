import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { AppState } from '../store/app.reducers';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((authData) => authData.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const newReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(newReq);
      })
    );
  }
}
