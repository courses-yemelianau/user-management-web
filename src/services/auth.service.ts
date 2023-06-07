import axios from '../config';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { Response } from '../interfaces/response.interface';
import { User } from '../interfaces/users.interface';

export const signUp = (userData: CreateUserDto) => {
    return axios.post<Response<User>>('/signup', userData);
};

export const logIn = (userData: LoginUserDto) => {
    return axios.post<Response<User>>('/login', userData, { withCredentials: true });
};

export const logOut = (userData: User) => {
    return axios.post<Response<User>>('/logout', userData, { withCredentials: true });
};
