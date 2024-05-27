import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode as decode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedUser = decode(token);
            setUser(decodedUser);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        const decodedUser = decode(token);
        setUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
        navigate('/');
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
