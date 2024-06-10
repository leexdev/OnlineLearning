import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode as decode } from 'jwt-decode';
import userApi from '~/api/userApi'; // Đảm bảo đường dẫn chính xác

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Trạng thái tải
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
                    setUser(decodedUser); // Trong trường hợp lỗi, chỉ sử dụng thông tin từ JWT
                }
            }
            setLoading(false); // Kết thúc trạng thái tải
        };

        fetchUserDetails();
    }, []);

    const login = async (token) => {
        localStorage.setItem('jwtToken', token);
        const decodedUser = decode(token);
        try {
            const userDetails = await userApi.get();
            setUser({ ...decodedUser, ...userDetails });
            navigate('/'); // Chuyển hướng sau khi lấy thông tin chi tiết thành công
        } catch (error) {
            console.error('Error fetching user details:', error);
            setUser(decodedUser);
            navigate('/'); // Chuyển hướng dù có lỗi hay không
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
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
