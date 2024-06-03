import React from 'react';
import FormFieldError from '~/components/FormFieldError';


const EmailInput = ({ register, error }) => (
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
            {...register('email', {
                required: 'Email là bắt buộc',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email không hợp lệ',
                },
            })}
        />
        <FormFieldError message={error?.message} />
    </div>
);

export default EmailInput;
