import {
  createReducer,
  on,
} from "@ngrx/store";

import { AuthActions } from "../action.types";
import { User } from "../model/user.model";

export interface AppState {}
export interface AuthState {
  user?: User
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(

  initialAuthState,

  on(AuthActions.login, (_state, action) => {
      return {
          user: action.user
      }
  }),

  on(AuthActions.logout, (_state, _action) => {
      return {
          user: undefined
      }
  })



);
