import React from 'react';
import FormFieldError from './FormFieldError';

const PasswordInput = ({ register, error }) => (
    <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Mật khẩu
        </label>
        <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
            placeholder="Mật khẩu"
            {...register('password', {
                required: 'Mật khẩu là bắt buộc',
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                        'Mật khẩu phải bao gồm ít nhất một ký tự chữ hoa, một ký tự chữ thường, một số, một ký tự đặc biệt và ít nhất 8 ký tự.',
                },
            })}
        />
        <FormFieldError message={error?.message} />
    </div>
);

export default PasswordInput;
