import React, { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FormFieldError from '~/components/Common/FormFieldError';

const imageHandler = function () {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const range = this.quill.getSelection();
            this.quill.insertEmbed(range.index, 'image', reader.result);
        };
        reader.readAsDataURL(file);
    };
};

const modules = {
    toolbar: {
        container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
        ],
        handlers: {
            image: imageHandler,
        },
    },
};

const AddQuestionModal = ({ isOpen, closeModal, handleAdd, subjectName }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        clearErrors,
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            content: '',
            explanation: '',
            isPronounce: false,
            isSortable: false,
            answers: [{ content: '', isCorrect: false }],
        },
    });
    const { fields, append, remove, replace } = useFieldArray({ control, name: 'answers' });

    const isPronounce = watch('isPronounce');
    const isSortable = watch('isSortable');

    const onSubmit = (data) => {
        clearErrors('answers');

        if (!isPronounce && !isSortable) {
            const hasCorrectAnswer = data.answers.some((answer) => answer.isCorrect);
            if (!hasCorrectAnswer) {
                setError('answers', {
                    type: 'manual',
                    message: 'Phải có ít nhất một đáp án đúng.',
                });
                return;
            }
        }
        handleAdd(data, setError);
        reset();
    };

    useEffect(() => {
        if (isPronounce || isSortable) {
            replace([]);
        }
    }, [isPronounce, isSortable, replace]);

    useEffect(() => {
        const subscription = watch((value) => {
            if (value.answers.some((answer) => answer.isCorrect)) {
                clearErrors('answers');
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    const handlePronounceChange = (e) => {
        const isChecked = e.target.checked;
        setValue('isPronounce', isChecked);
        if (isChecked) {
            setValue('isSortable', false);
        }
    };

    const handleSortableChange = (e) => {
        const isChecked = e.target.checked;
        setValue('isSortable', isChecked);
        if (isChecked) {
            setValue('isPronounce', false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                <h3 className="text-xl leading-6 font-bold text-gray-900">Thêm Câu Hỏi Mới</h3>
                                <div className="mt-4">
                                    <p className="font-bold">Nội Dung Câu Hỏi*</p>
                                    <Controller
                                        name="content"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <ReactQuill
                                                {...field}
                                                theme="snow"
                                                modules={modules}
                                                formats={[
                                                    'header',
                                                    'font',
                                                    'list',
                                                    'bullet',
                                                    'bold',
                                                    'italic',
                                                    'underline',
                                                    'color',
                                                    'background',
                                                    'align',
                                                    'link',
                                                    'image',
                                                ]}
                                                placeholder="Nhập nội dung câu hỏi..."
                                                className="mt-1"
                                            />
                                        )}
                                        rules={{
                                            required: 'Nội dung câu hỏi không được để trống',
                                        }}
                                    />
                                    {errors.content && <FormFieldError message={errors.content.message} />}
                                </div>
                                <div className="mt-2">
                                    <p className="font-bold">Giải Thích</p>
                                    <Controller
                                        name="explanation"
                                        control={control}
                                        defaultValue=""
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
                                                onChange={handlePronounceChange}
                                            />
                                            <span className="ml-2">Câu hỏi kiểm tra phát âm</span>
                                        </label>
                                    </div>
                                )}
                                <div className="mt-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            {...register('isSortable')}
                                            className="form-checkbox"
                                            onChange={handleSortableChange}
                                        />
                                        <span className="ml-2">Câu hỏi sắp xếp</span>
                                    </label>
                                </div>
                                {!isPronounce && isSortable && (
                                    <div className="mt-4">
                                        <p className="font-bold">Câu Trả Lời</p>
                                        <DragDropContext
                                            onDragEnd={(result) => {
                                                const { source, destination } = result;
                                                if (!destination) return;

                                                const updatedFields = Array.from(fields);
                                                const [movedItem] = updatedFields.splice(source.index, 1);
                                                updatedFields.splice(destination.index, 0, movedItem);

                                                updatedFields.forEach((item, index) => {
                                                    item.order = index;
                                                });

                                                replace(updatedFields);
                                            }}
                                        >
                                            <Droppable droppableId="answers">
                                                {(provided) => (
                                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                                        {fields.map((field, index) => (
                                                            <Draggable
                                                                key={field.id}
                                                                draggableId={field.id}
                                                                index={index}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="mb-2 p-2 border rounded"
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <Controller
                                                                                name={`answers.${index}.content`}
                                                                                control={control}
                                                                                defaultValue={field.content}
                                                                                render={({ field }) => (
                                                                                    <ReactQuill
                                                                                        {...field}
                                                                                        theme="snow"
                                                                                        modules={modules}
                                                                                        formats={[
                                                                                            'header',
                                                                                            'font',
                                                                                            'list',
                                                                                            'bullet',
                                                                                            'bold',
                                                                                            'italic',
                                                                                            'underline',
                                                                                            'color',
                                                                                            'background',
                                                                                            'align',
                                                                                            'link',
                                                                                            'image',
                                                                                        ]}
                                                                                        placeholder="Nhập nội dung câu trả lời..."
                                                                                        className="mt-1"
                                                                                    />
                                                                                )}
                                                                                rules={{
                                                                                    required:
                                                                                        'Nội dung câu trả lời không được để trống',
                                                                                }}
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => remove(index)}
                                                                                className="ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                                                                            >
                                                                                Xóa
                                                                            </button>
                                                                        </div>
                                                                        {errors.answers &&
                                                                            errors.answers[index]?.content && (
                                                                                <FormFieldError
                                                                                    message={
                                                                                        errors.answers[index]?.content
                                                                                            ?.message
                                                                                    }
                                                                                />
                                                                            )}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                        {errors.answers && typeof errors.answers.message === 'string' && (
                                            <div className="mt-2 text-red-600">{errors.answers.message}</div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => append({ content: '' })}
                                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                        >
                                            Thêm Câu Trả Lời
                                        </button>
                                    </div>
                                )}
                                {!isPronounce && !isSortable && (
                                    <div className="mt-4">
                                        <p className="font-bold">Câu Trả Lời</p>
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="mt-2">
                                                <div className="flex items-center">
                                                    <Controller
                                                        name={`answers.${index}.content`}
                                                        control={control}
                                                        defaultValue={field.content}
                                                        render={({ field }) => (
                                                            <ReactQuill
                                                                {...field}
                                                                theme="snow"
                                                                modules={modules}
                                                                formats={[
                                                                    'header',
                                                                    'font',
                                                                    'list',
                                                                    'bullet',
                                                                    'bold',
                                                                    'italic',
                                                                    'underline',
                                                                    'color',
                                                                    'background',
                                                                    'align',
                                                                    'link',
                                                                    'image',
                                                                ]}
                                                                placeholder="Nhập nội dung câu trả lời..."
                                                                className="mt-1"
                                                            />
                                                        )}
                                                        rules={{
                                                            required: 'Nội dung câu trả lời không được để trống',
                                                        }}
                                                    />
                                                    <label className="ml-2 inline-flex items-center">
                                                        <Controller
                                                            name={`answers.${index}.isCorrect`}
                                                            control={control}
                                                            defaultValue={field.isCorrect}
                                                            render={({ field }) => (
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-checkbox"
                                                                    checked={field.value}
                                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                                />
                                                            )}
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

export default AddQuestionModal;
