import { createAction, props } from "@ngrx/store";

export const tryLogIn = createAction(
    '[LogIn] Try Log In',
    props<{ username: string, password: string }>()
)

export const logInSuccess = createAction(
    '[LogIn] Log In Success'
)

export const logInFailed = createAction(
    '[LogIn] Log In Failed'
)