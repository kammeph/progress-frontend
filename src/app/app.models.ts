export interface User {
    id: string,
    username: string,
    roles: string[]
}

export interface Token {
    access_token: string,
    token_type: string
}