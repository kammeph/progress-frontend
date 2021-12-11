import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/lib/services/auth.service/auth.service";
import * as RegistrationActions from "./registration.actions";

@Injectable()
export class RegistrationEffects {
    tryRegister$ = createEffect(() =>
        this.actions$.pipe(
          ofType(RegistrationActions.tryRegister),
          mergeMap(({username, password}) => this.authService.register(username, password).pipe(
            map(() => RegistrationActions.registerSuccess()),
            catchError(err => of(RegistrationActions.registerFailed()))
          )
        )
      )
    );

    registerSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(RegistrationActions.registerSuccess),
        tap(() => this.router.navigateByUrl('/login'))
      ), { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}
}