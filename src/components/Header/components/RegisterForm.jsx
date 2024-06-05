import React from 'react';
import { useForm } from 'react-hook-form';
import userApi from '~/api/userApi';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import { convertErrorsToCamelCase } from '~/utils/errorUtils';
import PasswordConfirmInput from './PasswordConfirmInput';
import SubmitButton from './SubmitButton';
import NameInput from './NameInput';

const RegisterForm = ({ switchToLogin, onClose }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        if (data.password !== data.passwordConfirm) {
            setError('passwordConfirm', {
                type: 'manual',
                message: 'Mật khẩu và xác nhận mật khẩu không khớp',
            });
            return;
        }
        try {
            await userApi.register({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            alert('Đăng ký thành công');
            onClose();
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData);
                Object.keys(errorData).forEach((key) =>
                    setError(key, { type: 'manual', message: errorData[key] })
                );
            } else {
                alert('Đã xảy ra lỗi khi đăng ký.');
            }
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <NameInput register={register} error={errors.name}/>
            <EmailInput register={register} error={errors.email} />
            <PasswordInput register={register} error={errors.password} />
            <PasswordConfirmInput register={register} error={errors.passwordConfirm} watch={watch} />
            <SubmitButton label="Đăng ký" />
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
