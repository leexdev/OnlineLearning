import React, { useState } from 'react';
import FormFieldError from './FormFieldError';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PasswordInput = ({ register, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Mật khẩu
            </label>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5 ${error ? 'border-red-500' : ''}`}
                    placeholder="Mật khẩu"
                    {...register('password', {
                        required: 'Mật khẩu là bắt buộc',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Mật khẩu phải bao gồm ít nhất một ký tự chữ hoa, một ký tự chữ thường, một số, một ký tự đặc biệt và ít nhất 8 ký tự.',
                        },
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

export default PasswordInput;
