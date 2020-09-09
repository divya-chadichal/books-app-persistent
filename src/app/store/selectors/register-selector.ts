import { RegisterState } from '../reducers/register-reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getRegisterReferenceState = createFeatureSelector<RegisterState>('register');

export const registerSelector = createSelector(getRegisterReferenceState, state => state);