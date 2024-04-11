export interface User {
    username: string;
    password: string;
    roles: string[];
}

export interface UserResponse {
    data: User;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}
