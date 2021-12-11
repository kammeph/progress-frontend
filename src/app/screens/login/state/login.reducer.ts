import { createReducer, on } from "@ngrx/store";
import * as LogInActions from "./login.actions";

export interface LoginState {
    tryLogIn: boolean;
    logInSuccess: boolean;
    logInFailed: boolean;
}

const initialState: LoginState = {
    tryLogIn: false,
    logInSuccess: false,
    logInFailed: false
}

export const logInReducer = createReducer(
    initialState,
    on(LogInActions.tryLogIn, state => (
        {
            ...state,
            tryLogIn: true,
            logInSuccess: false,
            logInFailed: false
        })
    ),
    on(LogInActions.logInSuccess, state => (
        {
            ...state,
            tryLogIn: false,
            logInSuccess: true
        })
    ),
    on(LogInActions.logInFailed, state => (
        {
            ...state,
            tryLogIn: false,
            logInFailed: true
        })
    )
);