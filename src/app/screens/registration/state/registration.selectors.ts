import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RegistrationState } from "./registration.reducer";

export const getRegistrationState = createFeatureSelector<RegistrationState>('registration');

export const selectTryRegister = createSelector(
    getRegistrationState,
    state => state.tryRegister
);

export const selectRegistrationSuccess = createSelector(
    getRegistrationState,
    state => state.registrationSuccess
);

export const selectRegistrationFailed = createSelector(
    getRegistrationState,
    state => state.registrationFailed
);