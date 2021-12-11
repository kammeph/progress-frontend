import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from "./login.reducer";

export const getLogInState = createFeatureSelector<LoginState>('login');

export const selectTryLogIn = createSelector(
    getLogInState,
    state => state.tryLogIn
);

export const selectLogInSuccess = createSelector(
    getLogInState,
    state => state.logInSuccess
);

export const selectLogInFailed = createSelector(
    getLogInState,
    state => state.logInFailed
);