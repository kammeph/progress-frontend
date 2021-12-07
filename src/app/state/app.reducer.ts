import { createReducer, on, props } from "@ngrx/store";
import * as AppActions from "./app.action";

export interface AppState {
    isLoggedIn: boolean;
    isOnline: boolean;
    accessToken: string,
    tryLogIn: boolean;
}

const initialState: AppState = {
    isLoggedIn: false,
    isOnline: false,
    accessToken: '',
    tryLogIn: false
}

export const appReducer = createReducer(
    initialState,
    on(AppActions.tryLogIn, state => ({...state, tryLogIn: true })),
    on(AppActions.logInSuccess, (state, { accessToken }) => ({ ...state, accessToken: accessToken, tryLogIn: false}))
)