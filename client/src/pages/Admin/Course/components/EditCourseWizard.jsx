import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import courseApi from '~/api/courseApi';
import gradeApi from '~/api/gradeApi';
import { toast } from 'react-toastify';
import StepNavigation from './StepNavigation';
import CourseForm from './Course/CourseForm';
import ChapterForm from './Chapter/ChapterForm';

const EditCourseWizard = () => {
    const { courseId } = useParams();
    const [step, setStep] = useState(0);
    const [grades, setGrades] = useState([]);
    const [course, setCourse] = useState(null);

    const steps = ['Giới thiệu khóa học', 'Chương trình giảng dạy'];

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const gradeResponse = await gradeApi.getAll();
                setGrades(gradeResponse);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        const fetchCourse = async () => {
            try {
                const response = await courseApi.getAllChildren(courseId);
                setCourse(response);
                console.log("response", response );
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu khóa học:', error);
                toast.error('Không thể tải dữ liệu khóa học.');
            }
        };

        fetchGrades();
        fetchCourse();
    }, [courseId]);

    const handleCourseSubmit = async (data) => {
        try {
            await courseApi.update(courseId, data);
            toast.success('Cập nhật khóa học thành công');
            setStep((prevStep) => prevStep + 1);
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData);
                Object.keys(errorData).forEach((key) => setError(key, { type: 'manual', message: errorData[key] }));
            } else {
                toast.error('Đã xảy ra lỗi khi đăng nhập.');
            }
        }
    };

    const handleChapterSubmit = () => {
        history.push('/admin/course');
    };

    if (!course) {
        return <div>Loading...</div>; // Hiển thị khi dữ liệu khóa học chưa được tải xong
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Chỉnh sửa khóa học</h1>
            <StepNavigation steps={steps} currentStep={step} />
            {step === 0 && (
                <CourseForm onSubmit={handleCourseSubmit} grades={grades} initialData={course} isEditing={true} />
            )}
            {step === 1 && course && <ChapterForm onSubmit={handleChapterSubmit} course={course} />}
        </div>
    );
};

export default EditCourseWizard;
