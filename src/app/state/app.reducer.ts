import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import * as AppActions from "./app.action";

export interface AppState {
    isLoggedIn: boolean;
    isOnline: boolean;
    username: string,
    roles: string[],
}

const initialState: AppState = {
    isLoggedIn: false,
    isOnline: false,
    username: '',
    roles: [],
}

export const appReducer = createReducer(
    initialState,
    on(AppActions.getAuthenticatedUser, state => ({
        ...state
    })),
    on(AppActions.getAuthenticatedUserSuccess, (state, { username, roles }) => ({
        ...state,
        isLoggedIn: true,
        username: username,
        roles: roles
    })),
    on(AppActions.getAuthenticatedUserFailed, state => ({
        ...state,
        isLoggedIn: false,
        username: '',
        roles: []
    }))
);