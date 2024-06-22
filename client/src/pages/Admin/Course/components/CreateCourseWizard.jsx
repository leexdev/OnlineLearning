import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import courseApi from '~/api/courseApi';
import gradeApi from '~/api/gradeApi';
import { toast } from 'react-toastify';
import StepNavigation from './StepNavigation';
import CourseForm from './Course/CourseForm';
import ChapterForm from './Chapter/ChapterForm';

const CreateCourseWizard = ({ courseToEdit }) => {
    const [step, setStep] = useState(0);
    const [grades, setGrades] = useState([]);
    const [course, setCourse] = useState(courseToEdit || null);
    const steps = ['Giới thiệu khóa học', 'Chương trình giảng Dạy'];

    console.log("Hello");

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const gradeResponse = await gradeApi.getAll();
                setGrades(gradeResponse);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchGrades();
    }, []);

    const handleCourseSubmit = async (data) => {
        try {
            let response;
            if (courseToEdit) {
                response = await courseApi.update(courseToEdit.id, data);
                toast.success('Cập nhật khóa học thành công');
            } else {
                response = await courseApi.add(data);
                toast.success('Thêm khóa học thành công');
            }
            setCourse(response);
            setStep((prevStep) => prevStep + 1);
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

    const handleChapterSubmit = () => {
        useNavigate('admin/course');
    };

    return (
        <Fragment>
            <StepNavigation steps={steps} currentStep={step} />
            {step === 0 && <CourseForm onSubmit={handleCourseSubmit} grades={grades} course={course} />}
            {step === 1 && course && <ChapterForm onSubmit={handleChapterSubmit} course={course} />}
        </Fragment>
    );
};

export default CreateCourseWizard;
