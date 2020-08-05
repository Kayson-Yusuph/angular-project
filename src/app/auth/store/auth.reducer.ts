import { User } from '../user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
  loading: boolean;
  authError: string;
}

const initialState: State = {
  user: null,
  loading: false,
  authError: null
};
export function authReducers(
  state = initialState,
  action: AuthActions.AuthActionTypes
) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        loading: true,
        authError: null
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload
      };
    case AuthActions.SIGN_UP_SUCCESS:
      return {
        ...state
      };
    case AuthActions.SIGN_UP_sTART:
      return {
        ...state
      };
    case AuthActions.SIGN_UP_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
