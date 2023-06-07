export interface CreateUserDto {
    email: string;
    password: string;
    name: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    status: string;
}
