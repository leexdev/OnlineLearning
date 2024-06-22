// components/UserForm.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormFieldError from '~/components/Common/FormFieldError';

const UserForm = ({ isEditing, currentUser, handleSubmit, onSubmit, setShowModal, reset, errors }) => {
    useEffect(() => {
        if (isEditing && currentUser) {
            reset({ name: currentUser.name, email: currentUser.email });
        } else {
            reset({ name: '', email: '' });
        }
    }, [isEditing, currentUser, reset]);

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="text-center sm:mt-0 sm:text-left">
                            <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                                {isEditing ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                            </h3>
                            <div className="mt-4">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Tên người dùng"
                                            {...register('name', {
                                                required: 'Tên người dùng không được để trống',
                                                minLength: {
                                                    value: 3,
                                                    message: 'Tên người dùng phải tối thiểu 3 ký tự',
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Tên người dùng tối đa 50 ký tự',
                                                },
                                            })}
                                            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-peach focus:ring-peach"
                                        />
                                        {errors.name && <FormFieldError message={errors.name.message} />}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            {...register('email', {
                                                required: 'Email không được để trống',
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: 'Email không hợp lệ',
                                                },
                                            })}
                                            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-peach focus:ring-peach"
                                        />
                                        {errors.email && <FormFieldError message={errors.email.message} />}
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                            onClick={() => {
                                                setShowModal(false);
                                                reset();
                                            }}
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                        >
                                            {isEditing ? 'Cập nhật' : 'Lưu'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
