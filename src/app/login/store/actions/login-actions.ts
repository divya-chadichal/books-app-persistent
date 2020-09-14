import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/login-user';

export const login = createAction('[Auth] Login', props<{ user: User }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{accessToken}>());

export const loginFailure = createAction('[Auth] Login Failure', props<{error}>());

