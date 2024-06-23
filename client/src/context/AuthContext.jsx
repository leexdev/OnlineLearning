import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode as decode } from 'jwt-decode';
import userApi from '~/api/userApi';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redirected, setRedirected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decodedUser = decode(token);
                try {
                    const userDetails = await userApi.get();
                    const fullUser = { ...decodedUser, ...userDetails };
                    setUser(fullUser);
                    if (!redirected) {
                        if (fullUser.role === 'Admin') {
                            setRedirected(true);
                            navigate('/admin/home');
                        } else if (fullUser.role === 'Teacher') {
                            setRedirected(true);
                            navigate('/my-advise');
                        }
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    setUser(decodedUser);
                }
            }
            setLoading(false);
        };

        fetchUserDetails();
    }, [navigate, redirected]);

    const login = async (token) => {
        localStorage.setItem('jwtToken', token);
        const decodedUser = decode(token);
        try {
            const userDetails = await userApi.get();
            const fullUser = { ...decodedUser, ...userDetails };
            setUser(fullUser);
            setRedirected(true);
            if (fullUser.role === 'Admin') {
                navigate('/admin/home');
            } else if (fullUser.role === 'Teacher') {
                navigate('/my-advise');
            } else {
                navigate('/');
            }
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
        setRedirected(false);
        navigate('/');
    };

    return <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
