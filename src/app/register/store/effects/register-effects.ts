import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RegisterService } from '../../../core/services/register.service';
import * as LoginActions from '../actions/register-actions';

@Injectable()
export class RegisterEffects {
    @Effect()
    login$ = this.actions$.pipe(
      ofType(LoginActions.register),
      mergeMap(action =>
        this.registerService.registerUser(action.user).pipe(
          map(res => LoginActions.registerSuccess({accessToken : res})),
          catchError(error => of(LoginActions.registerFailure({error})))
        )
      )
    );

  constructor(private actions$: Actions, private registerService: RegisterService) {}
}
