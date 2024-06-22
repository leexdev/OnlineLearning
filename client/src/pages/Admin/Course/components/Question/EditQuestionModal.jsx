import React, { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import FormFieldError from '~/components/Common/FormFieldError';

const EditQuestionModal = ({ isOpen, closeModal, handleEdit, subjectName, questionData }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        clearErrors,
        reset,
        watch,
    } = useForm({
        defaultValues: {
            content: '',
            explanation: '',
            isPronounce: false,
            answers: [{ content: '', isCorrect: false }],
        },
    });
    const { fields, append, remove, replace } = useFieldArray({ control, name: 'answers' });

    const isPronounce = watch('isPronounce');

    useEffect(() => {
        if (questionData) {
            reset(questionData);
        }
    }, [questionData, reset]);

    const onSubmit = (data) => {
        clearErrors('answers');

        if (!isPronounce) {
            const hasCorrectAnswer = data.answers.some((answer) => answer.isCorrect);
            if (!hasCorrectAnswer) {
                setError('answers', {
                    type: 'manual',
                    message: 'Phải có ít nhất một đáp án đúng.',
                });
                return;
            }
        }
        handleEdit(data, setError);
        reset();
    };

    useEffect(() => {
        if (isPronounce) {
            replace([]);
        }
    }, [isPronounce, replace]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'isPronounce' && value.isPronounce) {
                replace([]);
            }
            if (value.answers.some((answer) => answer.isCorrect)) {
                clearErrors('answers');
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, clearErrors, replace]);

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
                                <h3 className="text-xl leading-6 font-bold text-gray-900">Chỉnh Sửa Câu Hỏi</h3>
                                <div className="mt-4">
                                    <p className="font-bold">Nội Dung Câu Hỏi*</p>
                                    <Controller
                                        name="content"
                                        control={control}
                                        render={({ field }) => (
                                            <textarea
                                                {...field}
                                                placeholder="Nhập nội dung câu hỏi..."
                                                className="mt-1 block w-full p-2 border rounded-md focus:border-peach focus:ring-peach"
                                                rows="5"
                                            />
                                        )}
                                        rules={{
                                            required: 'Nội dung câu hỏi không được để trống',
                                            maxLength: {
                                                value: 500,
                                                message: 'Nội dung câu hỏi không vượt quá 500 ký tự',
                                            },
                                        }}
                                    />
                                    {errors.content && <FormFieldError message={errors.content.message} />}
                                </div>
                                <div className="mt-2">
                                    <p className="font-bold">Giải Thích</p>
                                    <Controller
                                        name="explanation"
                                        control={control}
                                        render={({ field }) => (
                                            <textarea
                                                {...field}
                                                placeholder="Nhập giải thích cho câu hỏi (nếu có)..."
                                                className="mt-1 block w-full p-2 border rounded-md focus:border-peach focus:ring-peach"
                                                rows="5"
                                            />
                                        )}
                                    />
                                    {errors.explanation && <FormFieldError message={errors.explanation.message} />}
                                </div>
                                {subjectName.toLowerCase() === 'tiếng anh' && (
                                    <div className="mt-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                {...register('isPronounce')}
                                                className="form-checkbox"
                                            />
                                            <span className="ml-2">Câu hỏi kiểm tra phát âm</span>
                                        </label>
                                    </div>
                                )}
                                {!isPronounce && (
                                    <div className="mt-4">
                                        <p className="font-bold">Câu Trả Lời</p>
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="mt-2">
                                                <div className="flex items-center">
                                                    <Controller
                                                        name={`answers.${index}.content`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                placeholder="Nhập nội dung câu trả lời..."
                                                                className="block w-full p-2 border rounded-md"
                                                            />
                                                        )}
                                                        rules={{
                                                            required: 'Nội dung câu trả lời không được để trống',
                                                        }}
                                                    />
                                                    <label className="ml-2 inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            {...register(`answers.${index}.isCorrect`)}
                                                            className="form-checkbox"
                                                        />
                                                        <span className="ml-2">Đúng</span>
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                                {errors.answers && errors.answers[index]?.content && (
                                                    <FormFieldError message={errors.answers[index]?.content?.message} />
                                                )}
                                            </div>
                                        ))}
                                        {errors.answers && typeof errors.answers.message === 'string' && (
                                            <div className="mt-2 text-red-600">{errors.answers.message}</div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => append({ content: '', isCorrect: false })}
                                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                        >
                                            Thêm Câu Trả Lời
                                        </button>
                                    </div>
                                )}
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
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditQuestionModal;