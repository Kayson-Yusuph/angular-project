import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as appStore from '../store/app.reducers';
import * as authActions from '../auth/store/auth.action';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private expirationTimer: any;

  constructor(
    private store: Store<appStore.AppState>
  ) {}

  setExpTimer(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.store.dispatch(new authActions.Logout());
    }, expirationDuration);
  }

  clearExpTimer() {
    if(this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
  }
}
