import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import courseApi from '~/api/courseApi';
import gradeApi from '~/api/gradeApi';
import { toast } from 'react-toastify';
import StepNavigation from './StepNavigation';
import CourseForm from './Course/CourseForm';
import ChapterForm from './Chapter/ChapterForm';

const CreateCourseWizard = () => {
    const [step, setStep] = useState(0);
    const [course, setCourse] = useState(null);
    const [grades, setGrades] = useState([]);
    const steps = ['Giới thiệu khóa học', 'Chương trình giảng Dạy', 'Câu hỏi ôn tập', 'Xuất bản'];

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
            const response = await courseApi.add(data);
            toast.success('Tạo khóa học thành công');
            setCourse(response);
            setStep(1);
        } catch (error) {
            console.error('Lỗi khi tạo khóa học:', error);
            toast.error('Lỗi khi tạo khóa học');
        }
    };

    const handleChapterSubmit = () => {
        setStep(2);
    };

    return (
        <Fragment>
            <StepNavigation steps={steps} currentStep={step} />
            {step === 0 && <CourseForm onSubmit={handleCourseSubmit} grades={grades} />}
            {step === 1 && course && <ChapterForm onSubmit={handleChapterSubmit} courseId={course.id} />}
            {/* {step === 2 && <QuestonForm onSubmit={handleQuestionSubmit} chapters={chapters} />} */}
        </Fragment>
    );
};

export default CreateCourseWizard;
