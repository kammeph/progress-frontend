import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, delay, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../lib/services/auth.service/auth.service';
import { UserService } from '../lib/services/user.service/user.service';
import { GetAuthenticatedUser, Login, Logout, Register } from './app.action';

export class AppStateModel {
    isLoggedIn: boolean;
    loginFailed: boolean;
    registrationSuccess: boolean;
    registrationFailed: boolean;
    isOnline: boolean;
    username: string;
    roles: string[];
    token: string;
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

    @Selector()
    static token(state: AppStateModel) {
        return state.token
    }

    constructor(
        private authService: AuthService,
        private userService: UserService) { }

    ngxsOnInit(ctx?: StateContext<AppStateModel>) { }

    @Action(Login)
    login({ patchState, dispatch }: StateContext<AppStateModel>, { username, password }: Login) {
        return this.authService.authenticate(username, password).pipe(
            tap(token => patchState({ token: token.accessToken })),
            mergeMap(() => dispatch(new GetAuthenticatedUser())),
            catchError(() => of(patchState({ loginFailed: true })))
        );
    }

    @Action(Logout)
    logout({ setState, dispatch }: StateContext<AppStateModel>) {
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

    @Action(GetAuthenticatedUser)
    getAuthenticatedUser({ patchState, dispatch }: StateContext<AppStateModel>) {
        return this.userService.getMe().pipe(
            tap(user => patchState({ 
                isLoggedIn: true,
                loginFailed: false,
                registrationSuccess: false,
                registrationFailed: false,
                username: user.username, 
                roles: user.roles })),
            mergeMap(() => dispatch(new Navigate(['']))),
            catchError(() => of(patchState({ loginFailed: true })))
        )
    }
}