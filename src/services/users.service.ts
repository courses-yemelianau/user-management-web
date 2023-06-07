import axios from '../config';
import { User } from '../interfaces/users.interface';
import { UpdateUserDto } from '../dtos/users.dto';
import { Response } from '../interfaces/response.interface';

const path = '/users';

export const getUsers = () => {
    return axios.get<Response<User[]>>(`${path}`, { withCredentials: true });
};

export const updateUser = (userId: number, userData: UpdateUserDto) => {
    return axios.put<Response<User>>(`${path}/${userId}`, userData, { withCredentials: true });
};

export const deleteUser = (userId: number) => {
    return axios.delete<Response<User>>(`${path}/${userId}`, { withCredentials: true });
};
