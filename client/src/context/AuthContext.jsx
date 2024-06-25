import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode as decode } from 'jwt-decode';
import userApi from '~/api/userApi';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decodedUser = decode(token);
                try {
                    const userDetails = await userApi.get();
                    const fullUser = { ...decodedUser, ...userDetails };
                    setUser(fullUser);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    setUser(decodedUser);
                }
            }
            setLoading(false);
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (!loading && user && location.pathname === '/' && redirectToHome) {
            if (user.role === 'Admin') {
                navigate('/admin/home');
            } else if (user.role === 'Teacher') {
                navigate('/my-advise');
            }
            setRedirectToHome(false); // Reset the state after redirect
        }
    }, [user, loading, location.pathname, navigate, redirectToHome]);

    const login = async (token) => {
        localStorage.setItem('jwtToken', token);
        const decodedUser = decode(token);
        try {
            const userDetails = await userApi.get();
            const fullUser = { ...decodedUser, ...userDetails };
            setUser(fullUser);
            setRedirectToHome(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setUser(decodedUser);
            navigate('/');
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        toast.success('Đăng xuất thành công');
        setUser(null);
        navigate('/');
    };

    return <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
