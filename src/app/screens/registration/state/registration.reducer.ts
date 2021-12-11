import { createReducer, on } from "@ngrx/store";
import * as RegistrationActions from "./registration.actions"

export interface RegistrationState {
    tryRegister: boolean;
    registrationSuccess: boolean;
    registrationFailed: boolean;
}

const initialState: RegistrationState = {
    tryRegister: false,
    registrationSuccess: false,
    registrationFailed: false
}

export const registrationReducer = createReducer(
    initialState,
    on(RegistrationActions.tryRegister, state =>  (
        {
            ...state,
            tryRegister: true,
            registrationSuccess: false,
            registrationFailed: false
        }
    )),
    on(RegistrationActions.registerSuccess, state =>  (
        {
            ...state,
            tryRegister: false,
            registrationSuccess: true
        }
    )),
    on(RegistrationActions.registerFailed, state =>  (
        {
            ...state,
            tryRegister: false,
            registrationFailed: true
        }
    ))
);