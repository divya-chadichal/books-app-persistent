import { createAction, props } from '@ngrx/store';
import { RegisterUser } from '../../../models/register-user';

export const register = createAction('[Auth] Register', props<{ user: RegisterUser }>());

export const registerSuccess = createAction('[Auth] Register Success', props<{accessToken}>());

export const registerFailure = createAction('[Auth] Register Failure', props<{error}>());
