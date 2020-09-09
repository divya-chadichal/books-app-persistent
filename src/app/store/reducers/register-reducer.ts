import * as RegisterActions from '../actions/register-actions';
import { createReducer, on } from '@ngrx/store';
import { RegisterUser } from 'src/app/models/register-user';

export interface RegisterState {
  isRegistered: boolean;
  user : RegisterUser | null;
  token : string | null;
  message : string | null;
}

export const initialState: RegisterState = {
  isRegistered: false,
  user: null,
  token : null,
  message : null
};

export const registerReducer = createReducer(
    initialState,
    on(RegisterActions.register, (state, action) => {
            return {
            ...state,
            isRegistered : false,
            user : action.user,
            token : null,
            message : null
        };
    }),

    on(RegisterActions.registerSuccess, (state, action) => {
        return {
            ...state,
            isRegistered : true,
            user : null,
            token : action.accessToken.accessToken,
            message : null,
        };
    }),

    on(RegisterActions.registerFailure, (state, action) => {
        return {
            ...state,
            isRegistered : false,
            user : null,
            token : null,
            message : action.error,
        };
    })
);