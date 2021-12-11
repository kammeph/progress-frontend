import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/lib/services/auth.service/auth.service";
import * as LogInActions from "./login.actions";

@Injectable()
export class LogInEffects {
    tryLogIn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LogInActions.tryLogIn),
        switchMap(({ username, password }) => this.authService.authenticate(username, password).pipe(
            map(token => {
              localStorage.setItem('token', token.accessToken)
              return LogInActions.logInSuccess()
            }),
            catchError(err => of(LogInActions.logInFailed()))
        )
      ))
    );

    logInSuccess$ = createEffect(() => 
      this.actions$.pipe(
        ofType(LogInActions.logInSuccess),
        tap(() => this.router.navigateByUrl(''))
      ), { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}
}