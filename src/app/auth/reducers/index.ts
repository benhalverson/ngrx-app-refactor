import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action.types';

export interface AppState {

}

export interface AuthState {
  user: User;

}

export const initialAuthState: AuthState = {
  user: {
    id: '',
    email: ''
  }
};


export const authReducer = createReducer(initialAuthState, on(AuthActions.login, (state, action) => {
  return {
    user: action.user
  }
}));
