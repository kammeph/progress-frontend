import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, switchMap } from "rxjs";
import { AuthService } from "../lib/services/auth.service/auth.service";
import * as AppActions from "./app.action";

@Injectable()
export class AppEffects {
    tryLogIn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AppActions.tryLogIn),
        switchMap(({ username, password }) => this.authService.authenticate(username, password).pipe(
            map(token => {
              localStorage.setItem('token', token.accessToken)
              return AppActions.logInSuccess({accessToken: token.accessToken})
            }),
            catchError(() => EMPTY)
        )
      ))
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}
}