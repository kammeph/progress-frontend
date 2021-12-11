import { createAction, props } from "@ngrx/store";

export const getAuthenticatedUser = createAction(
    '[App] Get Authenticated User'
);

export const getAuthenticatedUserSuccess = createAction(
    '[App] Get Authenticated User Success',
    props<{ username: string, roles: string[] }>()
);

export const getAuthenticatedUserFailed = createAction(
    '[App] Get Authenticated User Failed'
);