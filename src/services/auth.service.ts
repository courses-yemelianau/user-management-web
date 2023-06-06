import axios from '../config';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';

export const signUp = (userData: CreateUserDto) => {
    return axios.post<User>(`/auth/signup`, userData);
};

export const logIn = (userData: CreateUserDto) => {
    return axios.post<{ cookie: string; findUser: User }>(`/auth/login`, userData);
};

export const logOut = () => {
    return axios.post<User>(`/auth/logout`);
};
