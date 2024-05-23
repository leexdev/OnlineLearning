import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const LoginForm = ({ switchToRegister, onClose }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form className="space-y-4" action="#">
            <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">
                    Tên đăng nhập
                </label>
                <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
                    placeholder="Tên đăng nhập"
                    required
                />
            </div>
            <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Mật khẩu
                </label>
                <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Mật khẩu"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
                    required
                />
                <button
                    type="button"
                    className="absolute h-[20px] bottom-[10px] right-0 flex items-center px-3 text-sm text-gray-600"
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                </button>
            </div>
            <div className="flex justify-end">
                <a href="#" className="text-sm text-gray-900 hover:text-peach">
                    Quên mật khẩu?
                </a>
            </div>
            <button
                type="submit"
                className="w-full text-white bg-peach hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Đăng nhập
            </button>
            <div className="text-sm font-medium text-gray-500">
                Bạn chưa có tài khoản?{' '}
                <button type="button" onClick={switchToRegister} className="text-peach hover:underline">
                    Đăng ký ngay
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
