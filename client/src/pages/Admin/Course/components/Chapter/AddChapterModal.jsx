import React from 'react';
import { useForm } from 'react-hook-form';
import FormFieldError from '~/components/Common/FormFieldError';

const AddChapterModal = ({ isOpen, closeModal, handleAddChapter }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        handleAddChapter(data, setError);
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div className="inline-block align-middle bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="text-center sm:mt-0 sm:text-left">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                <h3 className="text-lg leading-6 font-bold text-gray-900">Thêm Chương Mới</h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                                    <div>
                                        <input
                                            type="text"
                                            {...register('name', {
                                                required: 'Tên chương không được để trống.',
                                                maxLength: { value: 100, message: 'Tên chương tối đa 100 ký tự.' },
                                            })}
                                            placeholder="Nhập tên chương..."
                                            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-peach focus:ring-peach"
                                        />
                                        {errors.name && <FormFieldError message={errors.name.message} />}
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200 ml-2"
                                        >
                                            Thêm
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

export default AddChapterModal;
