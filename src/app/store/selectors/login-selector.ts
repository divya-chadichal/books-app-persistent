import { AuthState } from '../reducers/login-reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getAuthReferenceState = createFeatureSelector<AuthState>('user');

export const authSelector = createSelector(getAuthReferenceState, state => state);
