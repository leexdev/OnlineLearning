import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormFieldError from '~/components/Common/FormFieldError';

const EditChapterModal = ({ isOpen, closeModal, chapterData, handleEdit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            name: '',
        },
    });

    useEffect(() => {
        if (isOpen && chapterData) {
            setValue('name', chapterData.name);
        }
    }, [isOpen, chapterData, setValue]);

    const onSubmit = (data) => {
        handleEdit({ ...data, chapterId: chapterData.id }, setError);
        reset();
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                <h3 className="text-xl leading-6 font-bold text-gray-900">Sửa Chương</h3>
                                <div className="mt-4">
                                    <p className="font-bold">Tên Chương*</p>
                                    <input
                                        type="text"
                                        {...register('name', {
                                            required: 'Tiêu đề không được để trống',
                                            maxLength: {
                                                value: 100,
                                                message: 'Tiêu đề không được vượt quá 100 ký tự',
                                            },
                                        })}
                                        placeholder="Nhập tên chương..."
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-peach focus:border-peach"
                                    />
                                    {errors.name && <FormFieldError message={errors.name.message} />}
                                </div>
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
                                    Sửa
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditChapterModal;
