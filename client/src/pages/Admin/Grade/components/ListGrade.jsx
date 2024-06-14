import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import gradeApi from '~/api/gradeApi';
import FormFieldError from '~/components/Common/FormFieldError';
import { convertErrorsToCamelCase } from '~/utils/errorUtils';
import TableGrade from './TableGrade';
import GradeForm from './GradeForm';
import DeleteModal from './DeleteModal';

const ListGrade = () => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();
    const [grades, setGrades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGrade, setCurrentGrade] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [gradeToDelete, setGradeToDelete] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await gradeApi.getAll();
                setGrades(response);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchGrades();
    }, []);

    const onSubmit = async (data) => {
        try {
            if (isEditing) {
                console.log(currentGrade.id);
                const response = await gradeApi.update(currentGrade.id, data);
                setGrades(grades.map((grade) => (grade.id === currentGrade.id ? response : grade)));
                toast.success('Cập nhật khối lớp thành công');
            } else {
                const response = await gradeApi.add(data);
                setGrades([...grades, response]);
                toast.success('Thêm mới khối lớp thành công');
            }
            reset();
            setShowModal(false);
            setIsEditing(false);
            setCurrentGrade(null);
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData);
                Object.keys(errorData).forEach((key) => setError(key, { type: 'manual', message: errorData[key] }));
            } else {
                toast.error('Đã xảy ra lỗi.');
            }
        }
    };

    const handleEdit = (grade) => {
        setIsEditing(true);
        setCurrentGrade(grade);
        setShowModal(true);
        reset({ name: grade.name });
    };

    const handleDelete = async () => {
        try {
            await gradeApi.delete(gradeToDelete.id);
            setGrades(grades.filter((grade) => grade.id !== gradeToDelete.id));
            toast.success('Xóa khối lớp thành công');
            setShowDeleteModal(false);
            setGradeToDelete(null);
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi xóa.');
        }
    };

    const handleAddNew = () => {
        setShowModal(true);
        setIsEditing(false);
        setCurrentGrade(null);
        reset({ name: '' });
    };

    return (
        <div className="p-4 bg-white rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Danh sách Khối lớp</h2>
                <button
                    onClick={handleAddNew}
                    className="bg-peach hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                >
                    Thêm mới
                </button>
            </div>
            {showModal && (
                <GradeForm
                    isEditing={isEditing}
                    currentGrade={currentGrade}
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    setShowModal={setShowModal}
                    reset={reset}
                    errors={errors}
                />
            )}
            {showDeleteModal && <DeleteModal handleDelete={handleDelete} setShowDeleteModal={setShowDeleteModal} />}
            <TableGrade
                grades={grades}
                handleEdit={handleEdit}
                setGradeToDelete={setGradeToDelete}
                setShowDeleteModal={setShowDeleteModal}
            />
        </div>
    );
};

export default ListGrade;
