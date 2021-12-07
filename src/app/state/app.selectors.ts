import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

export const getAppState = createFeatureSelector<AppState>('app');

export const getTryLogIn = createSelector(
    getAppState,
    state => state.tryLogIn
);

export const getAccessToken = createSelector(
    getAppState,
    state => state.accessToken
)