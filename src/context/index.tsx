import { createContext, FC, ReactNode, useState } from 'react';
import { User } from '../interfaces/users.interface';

interface MyContextProps {
    isAuth: boolean;
    login: (user: User) => void;
    logout: () => void;
    getUser: () => User | null;
}

interface MyProviderProps {
    children: ReactNode;
}

const Context = createContext<MyContextProps>({
    isAuth: false,
    login: () => {},
    logout: () => {},
    getUser: () => null
});

const Provider: FC<MyProviderProps> = ({ children }) => {
    const getUser = (): User | null => {
        try {
            return JSON.parse(sessionStorage.getItem('user')!);
        } catch (error) {
            return null;
        }
    };

    const [isAuth, setIsAuth] = useState(!!getUser());

    const login = (user: User) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        setIsAuth(true);
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        setIsAuth(false);
    };

    return (
        <Context.Provider value={{
            isAuth,
            login,
            logout,
            getUser
        }}>
            {children}
        </Context.Provider>
    );
};

export { Context, Provider };
