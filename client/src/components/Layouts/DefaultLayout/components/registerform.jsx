import React from 'react';

const RegisterForm = ({ switchToLogin }) => {
    return (
        <form className="space-y-4" action="#">
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Tên đăng nhập
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
                    placeholder="Tên đăng nhập"
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Địa chỉ Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
                    placeholder="Địa chỉ Email"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Mật khẩu
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mật khẩu"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full text-white bg-peach hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Đăng ký
            </button>
            <div className="text-sm font-medium text-gray-500">
                Bạn đã có tài khoản?{' '}
                <button type="button" onClick={switchToLogin} className="text-peach hover:underline">
                    Đăng nhập
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
