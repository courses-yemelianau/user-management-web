import axios from '../config';
import { User } from '../interfaces/users.interface';
import { CreateUserDto } from '../dtos/users.dto';

export const getUsers = () => {
    return axios.get<User[]>('/users');
};

export const updateUser = (userId: number, userData: CreateUserDto) => {
    return axios.put<User>(`/users/${userId}`, userData);
};

export const deleteUser = (userId: number) => {
    return axios.delete<User>(`/users/${userId}`);
};
