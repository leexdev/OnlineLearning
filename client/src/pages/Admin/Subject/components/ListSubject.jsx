import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { convertErrorsToCamelCase } from '~/utils/errorUtils';
import subjectApi from '~/api/subjectApi';
import DeleteModal from './DeleteModal';
import SubjectTable from './SubjectTable';
import SubjectForm from './SubjectForm';

const ListSubject = () => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();
    const [subjects, setSubjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await subjectApi.getAll();
                setSubjects(response);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchSubjects();
    }, []);

    const onSubmit = async (data) => {
        try {
            let response;
            if (isEditing) {
                console.log(currentSubject.id);
                console.log(data);
                response = await subjectApi.update(currentSubject.id, data);
                console.log('Update response:', response); // Add this line
                setSubjects(subjects.map((subject) => (subject.id === currentSubject.id ? response : subject)));
                toast.success('Cập nhật môn học thành công');
            } else {
                response = await subjectApi.add(data);
                console.log('Add response:', response); // Add this line
                setSubjects([...subjects, response]);
                toast.success('Thêm mới môn học thành công');
            }
            reset();
            setShowModal(false);
            setIsEditing(false);
            setCurrentSubject(null);
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData.errors);
                Object.keys(errorData).forEach((key) => setError(key, { type: 'manual', message: errorData[key] }));
            } else {
                toast.error('Đã xảy ra lỗi.');
            }
        }
    };

    const handleEdit = (subject) => {
        setIsEditing(true);
        setCurrentSubject(subject);
        setShowModal(true);
        reset({ name: subject.name, gradeId: subject.gradeId });
    };

    const handleDelete = async () => {
        try {
            await subjectApi.delete(subjectToDelete.id);
            setSubjects(subjects.filter((subject) => subject.id !== subjectToDelete.id));
            toast.success('Xóa môn học thành công');
            setShowDeleteModal(false);
            setSubjectToDelete(null);
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi xóa.');
        }
    };

    const handleAddNew = () => {
        setShowModal(true);
        setIsEditing(false);
        setCurrentSubject(null);
        reset({ name: '', gradeId: '' });
    };

    return (
        <div className="p-4 bg-white rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Danh sách Môn học</h2>
                <button
                    onClick={handleAddNew}
                    className="bg-peach hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                >
                    Thêm mới
                </button>
            </div>
            {showModal && (
                <SubjectForm
                    isEditing={isEditing}
                    currentSubject={currentSubject}
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    setShowModal={setShowModal}
                    reset={reset}
                    errors={errors}
                />
            )}
            {showDeleteModal && <DeleteModal handleDelete={handleDelete} setShowDeleteModal={setShowDeleteModal} />}
            <SubjectTable
                subjects={subjects}
                handleEdit={handleEdit}
                setSubjectToDelete={setSubjectToDelete}
                setShowDeleteModal={setShowDeleteModal}
            />
        </div>
    );
};

export default ListSubject;
