import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGN_UP_START = '[Auth] Sign up start';
export const SIGN_UP_SUCCESS = '[Auth] Sign up success';
export const SIGN_UP_FAIL = '[Auth] Sign up fail';

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(
    public payload: { id: string; email: string; token: string; expDate: Date }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class SignUpSuccess implements Action {
  readonly type = SIGN_UP_SUCCESS;

  constructor(
    public payload: { id: string; email: string; token: string; expDate: Date }
  ) {}
}

export class SignUpFail implements Action {
  readonly type = SIGN_UP_FAIL;

  constructor(public payload: string) {}
}

export type AuthActionTypes =
  | LoginSuccess
  | Logout
  | LoginStart
  | LoginFail
  | SignUpFail
  | SignUpSuccess
  | SignUpStart;
