import React from 'react';
import FormFieldError from '~/components/Common/FormFieldError';

const GradeForm = ({ isEditing, currentGrade, register, handleSubmit, onSubmit, setShowModal, reset, errors }) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="text-center sm:mt-0 sm:text-left">
                            <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                                {isEditing ? 'Chỉnh sửa khối lớp' : 'Thêm khối lớp mới'}
                            </h3>
                            <div className="mt-4">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Tên khối lớp"
                                            {...register('name', {
                                                required: 'Tên lớp không được để trống',
                                                minLength: {
                                                    value: 5,
                                                    message: 'Tên lớp phải tối thiểu 5 ký tự',
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Tên lớp tối đa 50 ký tự',
                                                },
                                            })}
                                            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-peach focus:ring-peach"
                                        />
                                        {errors.name && <FormFieldError message={errors.name.message} />}
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                            onClick={() => {
                                                setShowModal(false);
                                                reset();
                                            }}
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                        >
                                            {isEditing ? 'Cập nhật' : 'Lưu'}
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

export default GradeForm;
