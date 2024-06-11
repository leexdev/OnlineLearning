import React, { useState, useMemo, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faGraduationCap, faPhone, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import adviseApi from '~/api/adviseApi';

const AdviseForm = ({ courseId, onClose, setAdviseSuccess    }) => {
    const [focusedInput, setFocusedInput] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleFocus = (inputName) => setFocusedInput(inputName);
    const handleBlur = () => setFocusedInput(null);

    const getInputWrapperClass = (inputName) =>
        `flex items-center border rounded-full p-1 overflow-hidden ${
            focusedInput === inputName ? 'ring-2 border-peach ring-peach' : ''
        }`;

    const generateYearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 20;
        const years = [];
        for (let year = currentYear; year >= startYear; year--) {
            years.push(year);
        }
        return years;
    }, []);

    const onSubmit = async (data) => {
        try {
            const param = {
                name: data.name,
                birthDay: data.birthYear,
                academic: data.academic,
                courseId: courseId,
            };
            await adviseApi.add(param);
            setAdviseSuccess('Gửi yêu cầu tư vấn thành công');
            reset();
            onClose();
        } catch (error) {
            console.error('Failed to send advise request', error);
        }
    };

    return (
        <Fragment>
            <div
                onClick={handleBackgroundClick}
                className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
            >
                <div className="bg-white p-6 rounded-lg m-4 md:m-0 shadow-lg w-full max-w-md relative">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-3 p-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <FontAwesomeIcon className="text-xl" icon={faXmark} />
                    </button>
                    <h2 className="text-3xl font-bold mb-4 text-center">YÊU CẦU TƯ VẤN</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                <div className={getInputWrapperClass('name')}>
                                    <span className="px-3 text-gray-700">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    <input
                                        value={user.name}
                                        type="text"
                                        className="w-full px-3 py-2 border-none focus:outline-none focus:ring-0"
                                        placeholder="Họ và tên"
                                        {...register('name', { required: 'Họ và tên là bắt buộc' })}
                                        onFocus={() => handleFocus('name')}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                <div className={getInputWrapperClass('phone')}>
                                    <span className="px-3 text-gray-700">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border-none focus:outline-none focus:ring-0"
                                        placeholder="Số điện thoại"
                                        {...register('phone', { required: 'Số điện thoại là bắt buộc' })}
                                        onFocus={() => handleFocus('phone')}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                <div className={getInputWrapperClass('birthYear')}>
                                    <span className="px-3 text-gray-700">
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </span>
                                    <select
                                        className="w-full px-3 py-2 border-none focus:outline-none focus:ring-0"
                                        {...register('birthYear', { required: 'Năm sinh là bắt buộc' })}
                                        onFocus={() => handleFocus('birthYear')}
                                        onBlur={handleBlur}
                                    >
                                        <option value="">Năm sinh</option>
                                        {generateYearOptions.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.birthYear && (
                                    <p className="text-red-500 text-sm mt-1">{errors.birthYear.message}</p>
                                )}
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                <div className={getInputWrapperClass('academic')}>
                                    <span className="px-3 text-gray-700">
                                        <FontAwesomeIcon icon={faGraduationCap} />
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border-none focus:outline-none focus:ring-0"
                                        placeholder="Học lực"
                                        {...register('academic', { required: 'Học lực là bắt buộc' })}
                                        onFocus={() => handleFocus('academic')}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.academic && (
                                    <p className="text-red-500 text-sm mt-1">{errors.academic.message}</p>
                                )}
                            </label>
                        </div>
                        <div className="text-center text-red-500 text-sm mb-4">
                            (*) Bằng việc đăng ký bạn đồng ý để hoctot liên hệ tư vấn
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 font-bold text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                        >
                            EM MUỐN HỌC THỬ MIỄN PHÍ
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AdviseForm;
