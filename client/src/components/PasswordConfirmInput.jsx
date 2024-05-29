import React, { useState } from 'react';
import FormFieldError from './FormFieldError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordConfirmInput = ({ register, error, watch }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <label htmlFor="passwordConfirm" className="block mb-2 text-sm font-medium text-gray-900">
                Xác nhận mật khẩu
            </label>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="passwordConfirm"
                    id="passwordConfirm"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5 ${error ? 'border-red-500' : ''}`}
                    placeholder="Xác nhận mật khẩu"
                    {...register('passwordConfirm', {
                        required: 'Xác nhận mật khẩu là bắt buộc',
                        validate: (value) => value === watch('password') || 'Mật khẩu và xác nhận mật khẩu không khớp',
                    })}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 text-black flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                </button>
            </div>
            {error && <FormFieldError message={error.message} />}
        </div>
    );
};

export default PasswordConfirmInput;
