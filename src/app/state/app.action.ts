import { createAction, props } from "@ngrx/store";
import { User } from "../app.models";

export const tryLogIn = createAction(
    '[App] Try Log In',
    props<{ username: string, password: string }>()
)

export const logInSuccess = createAction(
    '[App] Log In Success',
    props<{ accessToken: string }>()
)