import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormFieldError from '~/components/Common/FormFieldError';

const DiscountModal = ({
    isVisible,
    onClose,
    discountType,
    setDiscountType,
    handleDiscountSubmit,
    handleDiscountRemove,
    coursePrice,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            discountValue: '',
        },
    });

    useEffect(() => {
        if (isVisible) {
            reset({ discountValue: '' });
            clearErrors();
        }
    }, [isVisible, reset, clearErrors]);

    const onSubmit = (data) => {
        const discountValueNumber = parseFloat(data.discountValue.replace(/,/g, ''));
        if (isNaN(discountValueNumber) || discountValueNumber <= 0) {
            setError('discountValue', { type: 'manual', message: 'Giá trị giảm giá không hợp lệ' });
            return;
        }
        if (discountType === 'amount' && discountValueNumber > coursePrice) {
            setError('discountValue', { type: 'manual', message: 'Giá trị giảm giá không được lớn hơn giá khóa học' });
            return;
        }
        handleDiscountSubmit(discountType, discountValueNumber);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex justify-end items-center px-6 py-2">
                        <p className="font-bold text-xl">Thêm giá mới</p>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-3 ml-auto inline-flex items-center"
                            onClick={onClose}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className="px-6 py-2 space-y-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="percentageDiscount"
                                    name="discountType"
                                    value="percentage"
                                    checked={discountType === 'percentage'}
                                    onChange={() => setDiscountType('percentage')}
                                />
                                <label htmlFor="percentageDiscount">%</label>
                                <input
                                    type="radio"
                                    id="amountDiscount"
                                    name="discountType"
                                    value="amount"
                                    checked={discountType === 'amount'}
                                    onChange={() => setDiscountType('amount')}
                                />
                                <label htmlFor="amountDiscount">Số tiền</label>
                            </div>
                            <div className="flex flex-col mt-2">
                                <input
                                    type="text"
                                    {...register('discountValue', {
                                        required: 'Giá trị giảm giá không được để trống',
                                        pattern: {
                                            value: /^\d+(,\d{3})*$/,
                                            message: 'Giá trị phải là một số dương',
                                        },
                                        validate: (value) =>
                                            parseFloat(value.replace(/,/g, '')) > 0 || 'Giá trị phải là một số dương',
                                    })}
                                    onChange={(e) => {
                                        const formattedValue = e.target.value.replace(/\D/g, '');
                                        const numberWithCommas = formattedValue
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                        e.target.value = numberWithCommas;
                                        setValue('discountValue', numberWithCommas, { shouldValidate: true });
                                    }}
                                    placeholder={
                                        discountType === 'percentage' ? 'Nhập % giảm giá' : 'Nhập số tiền giảm giá'
                                    }
                                    className="border border-gray-300 p-2 w-full rounded"
                                />
                                {errors.discountValue && <FormFieldError message={errors.discountValue.message} />}
                            </div>
                            <div className="flex items-center justify-end space-x-2 my-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDiscountRemove}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                                >
                                    Xóa giảm giá
                                </button>
                                <button
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded"
                                >
                                    Áp dụng
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountModal;
