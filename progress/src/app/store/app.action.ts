export class Login {
  static readonly type = '[App] Login';
  constructor(public username: string, public password: string) {}
}

export class RefreshToken {
  static readonly type = '[App] Refresh Token';
}

export class Logout {
  static readonly type = '[App] Logout';
}

export class Register {
  static readonly type = '[App] Register';
  constructor(public username: string, public password: string) {}
}

export class ChangeLocale {
  static readonly type = '[App] Change Locale';
  constructor(public locale: string) {}
}
