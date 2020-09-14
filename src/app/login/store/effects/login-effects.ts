import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LoginService } from '../../../core/services/login.service';
import * as LoginActions from '../actions/login-actions';

@Injectable()
export class UserEffects {
    @Effect()
    login$ = this.actions$.pipe(
      ofType(LoginActions.login),
      mergeMap(action =>
        this.authService.loginUser(action.user).pipe(
          map(res => LoginActions.loginSuccess({accessToken : res})),
          catchError(error => of(LoginActions.loginFailure({error})))
        )
      )
    );

  constructor(private actions$: Actions, private authService: LoginService) {}
}
