import axios from '../config';
import { User } from '../interfaces/users.interface';
import { UpdateUserDto } from '../dtos/users.dto';
import { Response } from '../interfaces/response.interface';

const path = '/users';

export const getUsers = () => {
    return axios.get<Response<User[]>>(`${path}`, { withCredentials: true });
};

export const updateUsers = (userIds: number[], userData: UpdateUserDto) => {
    return axios.put<Response<User[]>>(`${path}/update`, { userIds, userData }, { withCredentials: true });
};

export const deleteUsers = (userIds: number[]) => {
    return axios.delete<Response<User[]>>(`${path}/delete`, { data: { userIds }, withCredentials: true });
};
