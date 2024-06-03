import React from 'react';
import FormFieldError from '../../FormFieldError';

const NameInput = ({ register, error }) => (
    <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Họ tên
        </label>
        <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
            placeholder="Họ tên"
            {...register('name', {
                required: 'Họ tên là bắt buộc'
            })}
        />
        <FormFieldError message={error?.message} />
    </div>
);

export default NameInput;
