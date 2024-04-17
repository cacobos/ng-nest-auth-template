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
    accessToken: string;
    user: User;
}

export interface ChangePasswordData {
    username: string;
    oldPassword: string;
    newPassword: string;
}

// ROLES
export const ROLES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER',
};
