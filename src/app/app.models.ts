export interface User {
    id: string,
    username: string,
    roles: string[]
}

export interface Token {
    accessToken: string,
    tokenType: string
}