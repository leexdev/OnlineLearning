import React from 'react';
import FormFieldError from './FormFieldError';

const PasswordConfirmInput = ({ register, error, watch }) => (
    <div>
        <label htmlFor="passwordConfirm" className="block mb-2 text-sm font-medium text-gray-900">
            Xác nhận mật khẩu
        </label>
        <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
            placeholder="Xác nhận mật khẩu"
            {...register('passwordConfirm', {
                required: 'Xác nhận mật khẩu là bắt buộc',
                validate: (value) => value === watch('password') || 'Mật khẩu và xác nhận mật khẩu không khớp',
            })}
        />
        <FormFieldError message={error?.message} />
    </div>
);

export default PasswordConfirmInput;
