import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormFieldError from '~/components/Common/FormFieldError';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '~/assets/styles/customStyles.css';

const EditLessonModal = ({ isOpen, closeModal, lessonData, handleEdit }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            isFree: false,
        },
    });

    useEffect(() => {
        if (isOpen && lessonData) {
            setValue('title', lessonData.title);
            setValue('description', lessonData.description);
            setValue('isFree', lessonData.isFree);
        }
    }, [isOpen, lessonData, setValue]);

    const onSubmit = (data) => {
        handleEdit({ ...data, lessonId: lessonData.id }, setError);
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
                                <h3 className="text-xl leading-6 font-bold text-gray-900">Sửa Bài Giảng</h3>
                                <div className="mt-4">
                                    <p className="font-bold">Tên Bài Giảng*</p>
                                    <input
                                        type="text"
                                        {...register('title', {
                                            required: 'Tiêu đề không được để trống',
                                            maxLength: {
                                                value: 100,
                                                message: 'Tiêu đề không được vượt quá 100 ký tự',
                                            },
                                        })}
                                        placeholder="Nhập tên bài giảng..."
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-peach focus:border-peach"
                                    />
                                    {errors.title && <FormFieldError message={errors.title.message} />}
                                </div>
                                <div className="mt-2">
                                    <span className="font-bold">Mô Tả Bài Giảng*</span>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <ReactQuill {...field} placeholder="Mô tả bài giảng..." />
                                        )}
                                        rules={{
                                            maxLength: {
                                                value: 500,
                                                message: 'Mô tả không vượt quá 500 ký tự',
                                            },
                                        }}
                                    />
                                    {errors.description && <FormFieldError message={errors.description.message} />}
                                </div>
                                <div className="mt-2">
                                    <label className="inline-flex items-center">
                                        <Controller
                                            name="isFree"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type="checkbox"
                                                    {...field}
                                                    checked={field.value}
                                                    className="form-checkbox"
                                                />
                                            )}
                                        />
                                        <span className="ml-2">Bài giảng miễn phí</span>
                                    </label>
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

export default EditLessonModal;
