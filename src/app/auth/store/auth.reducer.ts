import { User } from '../user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};
export function authReducers(
  state = initialState,
  action: AuthActions.AuthActionTypes
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expDate
      );
      return {
        ...state,
        user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
