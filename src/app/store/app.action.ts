export class Login {
    static readonly type = '[App] Login';
    constructor(public username: string, public password: string) { }
}

export class Logout {
    static readonly type = '[App] Logout';
}

export class Register {
    static readonly type = '[App] Register';
    constructor(public username: string, public password: string) { }
}

export class GetAuthenticatedUser {
    static readonly type = '[App] Get Authenticated User';
}