import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { convertErrorsToCamelCase } from '~/utils/errorUtils';
import courseApi from '~/api/courseApi';
import DeleteModal from './Course/DeleteModal';
import CourseTable from './Course/CourseTable';
import CourseForm from './Course/CourseForm';

const ListCourse = () => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseApi.getAll();
                setCourses(response);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchCourses();
    }, []);

    const onSubmit = async (data) => {
        try {
            let response;
            if (isEditing) {
                response = await courseApi.update(currentCourse.id, data);
                setCourses(courses.map((course) => (course.id === currentCourse.id ? response : course)));
                toast.success('Cập nhật khóa học thành công');
            } else {
                response = await courseApi.add(data);
                setCourses([...courses, response]);
                toast.success('Thêm khóa học thành công');
            }
            setShowModal(false);
            reset();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const convertedErrors = convertErrorsToCamelCase(error.response.data.errors);
                Object.keys(convertedErrors).forEach((key) => {
                    setError(key, { type: 'server', message: convertedErrors[key][0] });
                });
            }
            console.error('Lỗi khi thêm/sửa dữ liệu:', error);
        }
    };

    const handleEdit = (course) => {
        setIsEditing(true);
        setCurrentCourse(course);
        reset(course);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await courseApi.delete(courseToDelete.id);
            setCourses(courses.filter((course) => course.id !== courseToDelete.id));
            setShowDeleteModal(false);
            toast.success('Xóa khóa học thành công');
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-md">
            <CourseTable
                courses={courses}
                handleEdit={handleEdit}
                setCourseToDelete={setCourseToDelete}
                setShowDeleteModal={setShowDeleteModal}
            />
            {showModal && (
                <CourseForm
                    isEditing={isEditing}
                    currentCourse={currentCourse}
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    setShowModal={setShowModal}
                    reset={reset}
                    errors={errors}
                />
            )}
            {showDeleteModal && (
                <DeleteModal item={courseToDelete} onDelete={handleDelete} onCancel={() => setShowDeleteModal(false)} />
            )}
        </div>
    );
};

export default ListCourse;
