import React from 'react';
import courseApi from '~/api/courseApi';
import CourseForm from './CourseForm';

const EditCourse = ({ match, history }) => {
    const courseId = match.params.courseId;

    // Lấy dữ liệu khóa học cần chỉnh sửa từ API
    const fetchCourse = async () => {
        try {
            const response = await courseApi.getById(courseId);
            return response;
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu khóa học:', error);
            return null;
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await courseApi.update(courseId, formData);
            // Đã cập nhật thành công, điều hướng về trang danh sách khóa học hoặc chi tiết khóa học
            history.push(`/admin/course`);
        } catch (error) {
            console.error('Lỗi khi cập nhật khóa học:', error);
            // Xử lý thông báo lỗi hoặc hiển thị nút để thử lại
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Chỉnh sửa khóa học</h1>
            <CourseForm onSubmit={handleSubmit} initialData={fetchCourse} isEditing={true} />
        </div>
    );
};

export default EditCourse;
