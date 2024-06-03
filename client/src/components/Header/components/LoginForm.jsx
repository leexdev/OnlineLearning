import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import userApi from '~/api/userApi';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import { convertErrorsToCamelCase } from '~/utils/errorUtils';
import AuthContext from '~/context/AuthContext';

const LoginForm = ({ switchToRegister, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { login } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            const response = await userApi.login({
                email: data.email,
                password: data.password,
            });
            const token = response.token;
            localStorage.setItem('jwtToken', token);
            alert('Đăng nhập thành công');
            login(token);
            onClose();
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData);
                Object.keys(errorData).forEach((key) =>
                    setError(key, { type: 'manual', message: errorData[key] })
                );
            } else {
                alert('Đã xảy ra lỗi khi đăng nhập.');
            }
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <EmailInput register={register} error={errors.email} />
            <PasswordInput register={register} error={errors.password} />
            <SubmitButton label="Đăng nhập" />
            <div className="text-sm font-medium text-gray-500">
                Bạn chưa có tài khoản?{' '}
                <button type="button" onClick={switchToRegister} className="text-peach hover:underline">
                    Đăng ký
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
