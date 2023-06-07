import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { Context, Provider } from './context';

function PrivateRoute({ element, path }: { element: React.JSX.Element; path: string }) {
    const { isAuth } = useContext(Context);

    if (!isAuth) {
        return <Navigate to={path} />;
    }

    return element;
}

const App: React.FC = () => {
    return (
        <Provider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<PrivateRoute path="/login" element={<HomePage />} />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
