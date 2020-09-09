import * as LoginActions from '../actions/login-actions';
import { createReducer, on } from '@ngrx/store';

export interface AuthState {
  isAuthenticated: boolean;
  loginToken : null;
  message : string | null;
}

export const initialState: AuthState = {
  isAuthenticated : false,
  loginToken : null,
  message : null,
};

export const userReducer = createReducer(
    initialState,
    on(LoginActions.login, (state, action) => {
            return {
            ...state,
            isAuthenticated : false,
            loginToken : null,
            message: null
        };
    }),

    on(LoginActions.loginSuccess, (state, action) => {
        return {
            ...state,
            isAuthenticated : true,
            loginToken : action.accessToken.accessToken,
            message : null
        };
    }),

    on(LoginActions.loginFailure, (state, action) => {
        return {
            ...state,
            isAuthenticated : false,
            loginToken : null,
            message : action.error,
        };
    }),

    on(LoginActions.logout, (state, action) => {
        return {
            ...state,
        };
    }),

    on(LoginActions.logoutSuccess, (state, action) => {
        return {
        ...state,
        isAuthenticated : false,
        loginToken : null,
        message : null
    };
}),
);