import { createContext, FC, ReactNode, useState } from 'react';

interface MyContextProps {
    isAuth: boolean;
    login: (user: string) => void;
    logout: () => void;
}

interface MyProviderProps {
    children: ReactNode;
}

const Context = createContext<MyContextProps>({
    isAuth: false,
    login: () => {},
    logout: () => {}
});

const Provider: FC<MyProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(!!sessionStorage.getItem('user'));

    const login = (user: string) => {
        sessionStorage.setItem('user', user);
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
            logout
        }}>
            {children}
        </Context.Provider>
    );
};

export { Context, Provider };
