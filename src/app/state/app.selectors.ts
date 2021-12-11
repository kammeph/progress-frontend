import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

export const getAppState = createFeatureSelector<AppState>('app');

export const selectIsLoggedIn = createSelector(
    getAppState,
    state => state.isLoggedIn
);

export const selectIsOnline = createSelector(
    getAppState,
    state => state.isOnline
);

export const selectUsername = createSelector(
    getAppState,
    state => state.username
);

export const selectRoles = createSelector(
    getAppState,
    state => state.roles
);