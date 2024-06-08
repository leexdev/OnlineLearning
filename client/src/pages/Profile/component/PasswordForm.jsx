import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import userApi from '~/api/userApi';
import { Spinner } from 'flowbite-react';
import MessageModal from '~/components/MessageModal';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

const PasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const { currentPassword, newPassword } = data;
            await userApi.changePassword({ currentPassword, password: newPassword });
            setSuccess('Thay đổi mật khẩu thành công');
            reset();
        } catch (err) {
            setError('Mật khẩu hiện tại không chính xác hoặc có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <Helmet>
                <title>Đổi mật khẩu</title>
            </Helmet>
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
                <div className="mb-4">
                    <div className="md:flex md:items-center block text-left">
                        <label htmlFor="currentPassword" className="md:w-1/4 text-sm font-bold text-gray-900">
                            Mật khẩu hiện tại
                        </label>
                        <div className="relative md:w-3/4 mt-1">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                id="currentPassword"
                                {...register('currentPassword', { required: 'Mật khẩu hiện tại không được để trống' })}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5 ${errors.currentPassword ? 'border-red-500' : ''}`}
                                placeholder="Mật khẩu hiện tại"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 text-black flex items-center text-sm leading-5"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </button>
                        </div>
                    </div>
                    {errors.currentPassword && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.currentPassword.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <div className="md:flex md:items-center block text-left">
                        <label htmlFor="newPassword" className="md:w-1/4 text-sm font-bold text-gray-900">
                            Mật khẩu mới
                        </label>
                        <div className="relative md:w-3/4 mt-1">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                id="newPassword"
                                {...register('newPassword', {
                                    required: 'Mật khẩu mới không được để trống',
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/,
                                        message: 'Mật khẩu phải bao gồm ít nhất một ký tự chữ hoa, một ký tự chữ thường, một số, một ký tự đặc biệt và ít nhất 8 ký tự.',
                                    },
                                })}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5 ${errors.newPassword ? 'border-red-500' : ''}`}
                                placeholder="Mật khẩu mới"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 text-black flex items-center text-sm leading-5"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </button>
                        </div>
                    </div>
                    {errors.newPassword && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.newPassword.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <div className="md:flex md:items-center block text-left">
                        <label htmlFor="confirmPassword" className="md:w-1/4 text-sm font-bold text-gray-900">
                            Xác nhận mật khẩu mới
                        </label>
                        <div className="relative md:w-3/4 mt-1">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                {...register('confirmPassword', {
                                    required: 'Xác nhận mật khẩu không được để trống',
                                    validate: (value) =>
                                        value === watch('newPassword') || 'Mật khẩu xác nhận không khớp',
                                })}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                placeholder="Xác nhận mật khẩu mới"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 text-black flex items-center text-sm leading-5"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </button>
                        </div>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <button type="submit" className="mt-5 py-2 px-10 bg-peach text-white rounded-3xl uppercase font-bold shadow-md">
                    Đổi mật khẩu
                </button>
            </form>
        </Fragment>
    );
};

export default PasswordForm;
