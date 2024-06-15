import React, { useEffect, useState } from 'react';
import FormFieldError from '~/components/Common/FormFieldError';
import gradeApi from '~/api/gradeApi';

const SubjectForm = ({ isEditing, currentSubject, register, handleSubmit, onSubmit, setShowModal, reset, errors }) => {
    const [grades, setGrades] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState('');

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await gradeApi.getAll();
                setGrades(response);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu khối lớp:', error);
            }
        };
        fetchGrades();
    }, []);

    useEffect(() => {
        if (isEditing && currentSubject) {
            setSelectedGrade(currentSubject.gradeId);
        } else {
            setSelectedGrade('');
        }
    }, [isEditing, currentSubject]);

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="text-center sm:mt-0 sm:text-left">
                            <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                                {isEditing ? 'Chỉnh sửa môn học' : 'Thêm môn học mới'}
                            </h3>
                            <div className="mt-4">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Tên môn học"
                                            {...register('name', {
                                                required: 'Tên môn học không được để trống',
                                                minLength: {
                                                    value: 3,
                                                    message: 'Tên môn học phải tối thiểu 3 ký tự',
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Tên môn học tối đa 50 ký tự',
                                                },
                                            })}
                                            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-peach focus:ring-peach"
                                        />
                                        {errors.name && <FormFieldError message={errors.name.message} />}
                                    </div>
                                    <div>
                                        <select
                                            {...register('gradeId', {
                                                required: 'Vui lòng chọn khối lớp',
                                            })}
                                            value={selectedGrade}
                                            onChange={handleGradeChange}
                                            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-peach focus:ring-peach"
                                        >
                                            <option value="">Chọn khối lớp</option>
                                            {grades.map((grade) => (
                                                <option key={grade.id} value={grade.id}>
                                                    {grade.name}
                                                </option>
                                            ))}
                                        </select>
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

export default SubjectForm;
