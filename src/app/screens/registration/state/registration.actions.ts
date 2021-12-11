import { createAction, props } from "@ngrx/store";

export const tryRegister = createAction(
    '[Registration] Try Register',
    props<{username: string, password: string}>()
)

export const registerSuccess = createAction(
    '[Registration] Registration Success'
)

export const registerFailed = createAction(
    '[Registration] Registration Failed'
)