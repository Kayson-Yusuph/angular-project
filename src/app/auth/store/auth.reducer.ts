import { User } from "../user.model";

export interface State {
  user: User;
}

const initialState: State = {
  user: null
}
export function authReducers(state = initialState, action) {
  return state;
}
