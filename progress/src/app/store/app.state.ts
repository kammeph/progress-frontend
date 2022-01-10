import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, delay, mergeMap, of, tap, throwError } from 'rxjs';
import { AuthService } from '../lib/services/auth.service/auth.service';
import { TokenService } from '../lib/services/token.service/token.service';
import { Login, Logout, RefreshToken, Register } from './app.action';

export class AppStateModel {
    isLoggedIn: boolean;
    loginFailed: boolean;
    registrationSuccess: boolean;
    registrationFailed: boolean;
    isOnline: boolean;
}

@State<AppStateModel>({
    name: 'app',
    defaults: new AppStateModel()
})
@Injectable()
export class AppState implements NgxsOnInit {

    @Selector()
    static isLoggedIn(state: AppStateModel) {
        return state.isLoggedIn;
    }

    @Selector()
    static loginFailed(state: AppStateModel) {
        return state.loginFailed;
    }

    @Selector()
    static registrationSuccess(state: AppStateModel) {
        return state.registrationSuccess
    }

    @Selector()
    static registrationFailed(state: AppStateModel) {
        return state.registrationFailed
    }

    constructor(
        private authService: AuthService,
        private tokenService: TokenService) { }

    ngxsOnInit(ctx?: StateContext<AppStateModel>) { }

    @Action(Login)
    login({ patchState, dispatch }: StateContext<AppStateModel>, { username, password }: Login) {
        return this.authService.authenticate(username, password).pipe(
            tap(authData => {
                this.tokenService.setToken(authData.access_token);
                this.tokenService.setRefreshToken(authData.refresh_token);
                patchState({
                    isLoggedIn: true,
                    loginFailed: false,
                    registrationSuccess: false,
                    registrationFailed: false,
                })
            }),
            mergeMap(() => dispatch(new Navigate(['']))),
            catchError(() => of(patchState({ loginFailed: true })))
        );
    }

    @Action(RefreshToken)
    refreshToken({ dispatch }: StateContext<AppStateModel>) {
        const refreshToken = this.tokenService.getRefreshToken();
        if (refreshToken) {
            return this.authService.refreshToken(refreshToken).pipe(
                tap(token => this.tokenService.setToken(token.access_token)),
                catchError((err: HttpErrorResponse) => {
                    if (err.status == 401) {
                        return dispatch(new Logout())
                    }
                    return throwError(() => err);
                })
            )
        } else {
            return dispatch(new Logout());
        }
    }

    @Action(Logout)
    logout({ setState, dispatch }: StateContext<AppStateModel>) {
        this.tokenService.clearToken();
        this.tokenService.clearRefreshToken();
        setState(new AppStateModel());
        dispatch(new Navigate(['/login']));
    }

    @Action(Register)
    register({ patchState, dispatch }: StateContext<AppStateModel>, { username, password }: Register) {
        return this.authService.register(username, password).pipe(
            tap(() => patchState({ registrationSuccess: true })),
            delay(2000),
            mergeMap(() => dispatch(new Navigate(['/login']))),
            catchError(() => of(patchState({ registrationFailed: true })))
        )
    }
}