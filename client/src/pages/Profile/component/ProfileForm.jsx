import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, parseISO } from 'date-fns';
import AuthContext from '~/context/AuthContext';
import userApi from '~/api/userApi';
import images from '~/assets/images';
import { Spinner } from 'flowbite-react';
import MessageModal from '~/components/MessageModal';
import FormFieldError from '~/components/FormFieldError';

const ProfileForm = ({ user }) => {
    const { setUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: user.email || '',
            name: user.name || '',
            phoneNumber: user.phoneNumber || '',
            birthDay: user.birthDay ? format(parseISO(user.birthDay), 'yyyy-MM-dd') : '',
            sex: user.sex || '',
        },
    });

    useEffect(() => {
        if (user.birthDay) {
            setValue('birthDay', format(parseISO(user.birthDay), 'yyyy-MM-dd'));
        }
    }, [user.birthDay, setValue]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const updatedUser = await userApi.updateUser(data);
            setUser(updatedUser);
            setSuccess('Cập nhật thông tin thành công');
        } catch (error) {
            setError('Cập nhật thông tin thất bại');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            {error && <MessageModal title="Lỗi" image={images.sadcat} message={error} onClose={() => setError(null)} />}
            {success && (
                <MessageModal
                    title="Thành công"
                    image={images.cat}
                    message={success}
                    onClose={() => setSuccess(null)}
                />
            )}
            {isLoading && <Spinner />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 text-left md:text-center md:flex items-center">
                    <label htmlFor="email" className="md:w-1/4 text-gray-700 text-sm font-bold text-left">
                        Địa chỉ Email
                    </label>
                    <div className="md:w-3/4 mt-1">
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
                            disabled
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="mb-4 text-left md:text-center md:flex items-center">
                        <label htmlFor="name" className="md:w-1/4 text-sm font-bold text-gray-900 text-left">
                            Họ và tên
                        </label>
                        <div className="md:w-3/4 mt-1">
                            <input
                                type="text"
                                id="name"
                                {...register('name', {
                                    required: 'Tên là bắt buộc',
                                    maxLength: { value: 50, message: 'Tên không được vượt quá 50 ký tự' },
                                })}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5 ${
                                    errors.name ? 'border-red-500' : ''
                                }`}
                                placeholder="Họ và tên"
                            />
                        </div>
                    </div>
                    {errors.name && <FormFieldError message={errors.name.message} />}
                </div>
                <div className="mb-4">
                    <div className="mb-4 text-left md:text-center md:flex items-center">
                        <label htmlFor="phoneNumber" className="md:w-1/4 text-sm font-bold text-gray-900 text-left">
                            Số điện thoại
                        </label>
                        <div className="md:w-3/4 mt-1">
                            <input
                                type="tel"
                                id="phoneNumber"
                                {...register('phoneNumber', {
                                    maxLength: { value: 15, message: 'Số điện thoại không được vượt quá 15 ký tự' },
                                })}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5 ${
                                    errors.phoneNumber ? 'border-red-500' : ''
                                }`}
                                placeholder="Số điện thoại"
                            />
                        </div>
                    </div>
                    {errors.phoneNumber && <FormFieldError message={errors.phoneNumber.message} />}
                </div>

                <div className="mb-4">
                    <div className="mb-4 text-left md:text-center md:flex items-center">
                        <label htmlFor="birthDay" className="md:w-1/4 text-sm font-bold text-gray-900 text-left">
                            Ngày sinh
                        </label>
                        <div className="md:w-3/4 mt-1">
                            <input
                                type="date"
                                id="birthDay"
                                {...register('birthDay', {
                                    validate: {
                                        validDate: (value) =>
                                            new Date(value) <= new Date() ||
                                            'Ngày sinh không thể lớn hơn ngày hiện tại',
                                    },
                                })}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5 ${
                                    errors.birthDay ? 'border-red-500' : ''
                                }`}
                                placeholder="Ngày sinh"
                            />
                        </div>
                    </div>
                    {errors.birthDay && <FormFieldError message={errors.birthDay.message} />}
                </div>
                <div className="mb-4 text-left md:text-center md:flex items-center">
                    <label className="md:w-1/4 text-gray-700 text-sm font-bold text-left">Giới tính</label>
                    <div className="w-3/4 flex items-center space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                value="male"
                                {...register('sex', { required: 'Giới tính là bắt buộc' })}
                                className="form-radio text-peach focus:ring-peach"
                            />
                            <span className="ml-2">Nam</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                value="female"
                                {...register('sex', { required: 'Giới tính là bắt buộc' })}
                                className="form-radio text-peach focus:ring-peach"
                            />
                            <span className="ml-2">Nữ</span>
                        </label>
                        {errors.sex && <FormFieldError message={errors.sex.message} />}
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-5 py-2 px-10 bg-peach text-white rounded-3xl uppercase font-bold shadow-md"
                >
                    Cập nhật
                </button>
            </form>
        </Fragment>
    );
};

export default ProfileForm;
