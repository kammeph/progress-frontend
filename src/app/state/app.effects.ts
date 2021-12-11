import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../lib/services/user.service/user.service";
import { logInSuccess } from "../screens/login/state/login.actions";
import * as AppActions from "./app.action";


@Injectable()
export class AppEffects {
    tryLogIn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(logInSuccess),
        map(() => AppActions.getAuthenticatedUser())
      )
    );

    getAuthenticatedUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(AppActions.getAuthenticatedUser),
        switchMap(() => this.userService.getMe().pipe(
          map(user => AppActions.getAuthenticatedUserSuccess(user)),
          catchError(err => of(AppActions.getAuthenticatedUserFailed()))
        ))
      )
    )

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}
}