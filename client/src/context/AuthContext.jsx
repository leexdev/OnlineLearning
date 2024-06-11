import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode as decode } from 'jwt-decode';
import userApi from '~/api/userApi';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decodedUser = decode(token);
                try {
                    const userDetails = await userApi.get();
                    setUser({ ...decodedUser, ...userDetails });
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    setUser(decodedUser)
                }
            }
            setLoading(false);
        };

        fetchUserDetails();
    }, []);

    const login = async (token) => {
        localStorage.setItem('jwtToken', token);
        const decodedUser = decode(token);
        try {
            const userDetails = await userApi.get();
            setUser({ ...decodedUser, ...userDetails });
        } catch (error) {
            console.error('Error fetching user details:', error);
            setUser(decodedUser);
            navigate('/'); // Chuyển hướng dù có lỗi hay không
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        toast.success("Đăng xuất thành công");
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
