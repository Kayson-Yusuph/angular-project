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
export function reducers(
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
      localStorage.setItem('userData', JSON.stringify(user));
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
      const newUser = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expDate
      );
      localStorage.setItem('userData', JSON.stringify(newUser));
      return {
        ...state,
        user: newUser,
        loading: false,
        authError: null
      };
    case AuthActions.SIGN_UP_START:
      return {
        ...state,
        loading: true,
        authError: null
      };
    case AuthActions.SIGN_UP_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      return state;
  }
}
