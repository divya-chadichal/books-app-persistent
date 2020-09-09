import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { AuthenticationService } from '../../common/services/authentication.service';
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

    @Effect()
    logout$ = this.actions$.pipe(
      ofType(LoginActions.logout),
      mergeMap(() =>
        LoginActions.logoutSuccess)
      );
 
  constructor(private actions$: Actions, private authService: AuthenticationService) {}
}