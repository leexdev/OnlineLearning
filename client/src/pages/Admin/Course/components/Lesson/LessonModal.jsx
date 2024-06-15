import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormFieldError from '~/components/Common/FormFieldError';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '~/assets/styles/customStyles.css';

const LessonModal = ({ isOpen, closeModal, handleAddLesson }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        handleAddLesson(data, setError);
        reset();
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
                                <h3 className="text-xl leading-6 font-bold text-gray-900">Thêm Bài Giảng Mới</h3>
                                <div className="mt-4">
                                    <p className="font-bold">Tên Bài Giảng*</p>
                                    <input
                                        type="text"
                                        {...register('Title', {
                                            required: 'Tiêu đề không được để trống',
                                            maxLength: {
                                                value: 100,
                                                message: 'Tiêu đề không được vượt quá 100 ký tự',
                                            },
                                        })}
                                        placeholder="Nhập tên bài giảng..."
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    {errors.Title && <FormFieldError message={errors.Title.message} />}
                                </div>
                                <div className="mt-2">
                                    <span className="font-bold">Mô Tả Bài Giảng*</span>
                                    <Controller
                                        name="Description"
                                        control={control}
                                        defaultValue=""
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
                                    {errors.Description && <FormFieldError message={errors.Description.message} />}
                                </div>
                                <div className="mt-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            {...register('isFree')}
                                            className="form-checkbox bg-peach"
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
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LessonModal;
