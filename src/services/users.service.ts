import axios from '../config';
import { User } from '../interfaces/users.interface';
import { UpdateUserDto } from '../dtos/users.dto';
import { Response } from '../interfaces/response.interface';

export const getUsers = () => {
    return axios.get<Response<User[]>>('/users');
};

export const updateUser = (userId: number, userData: UpdateUserDto) => {
    return axios.put<Response<User>>(`/users/${userId}`, userData);
};

export const deleteUser = (userId: number) => {
    return axios.delete<Response<User>>(`/users/${userId}`);
};
