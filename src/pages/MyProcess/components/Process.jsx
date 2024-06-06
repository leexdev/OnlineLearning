import React, { useContext, useEffect, useState } from 'react';
import userAnswerApi from '~/api/userAnswerApi';
import HistoryChart from './HistoryChart';
import Gauge from './Gauge';
import lessonCompletedApi from '~/api/lessonCompletedApi';
import lessonApi from '~/api/lessonApi';
import questionApi from '~/api/questionApi';
import AuthContext from '~/context/AuthContext';
import Spinner from '~/components/Spinner';

const Process = ({ courseId }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Spinner />; // Hiển thị khi đang tải
    }

    if (!user) {
        return <div>User không được tìm thấy</div>; // Hiển thị khi không tìm thấy người dùng
    }

    const [historyData, setHistoryData] = useState(null);
    const [completedLessons, setCompletedLessons] = useState(0);
    const [totalLessons, setTotalLessons] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
    const [correctAnswersPercent, setCorrectAnswersPercent] = useState(0); // Đổi tên biến thành correctAnswersPercent

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [history, lessonsCompleted, lessonTotal, questionTotal, correctAnswers] = await Promise.all([
                    userAnswerApi.getUserAnswerHistory(courseId),
                    lessonCompletedApi.getLessonCompletedByUser(),
                    lessonApi.getByCourseId(courseId),
                    questionApi.getByCourseId(courseId),
                    userAnswerApi.getCorrectAnswers(),
                ]);
                processHistoryData(history);

                setCompletedLessons(lessonsCompleted.length);
                setTotalLessons(lessonTotal.length);
                setTotalQuestions(questionTotal.length);
                setTotalCorrectAnswers((prevCorrectAnswers) => Object.values(correctAnswers).filter(Boolean).length);
            } catch (error) {
                console.error('Failed to fetch user answer history:', error);
            }
        };

        fetchData();
    }, [courseId, totalQuestions]);

    const processHistoryData = (data) => {
        const labels = [...new Set(data.map((item) => new Date(item.createdAt).toLocaleDateString()))];
        const totalQuestions = labels.map(
            (label) => data.filter((item) => new Date(item.createdAt).toLocaleDateString() === label).length,
        );
        const correctAnswers = labels.map(
            (label) =>
                data.filter((item) => new Date(item.createdAt).toLocaleDateString() === label && item.isCorrect).length,
        );
        const wrongAnswers = labels.map((label, index) => totalQuestions[index] - correctAnswers[index]);

        setHistoryData({
            labels,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
        });
    };

    if (!historyData) {
        return <div>Loading...</div>;
    }

    const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    const correctAnswersPercentage = totalQuestions > 0 ? (totalCorrectAnswers / totalQuestions) * 100 : 0; // Sử dụng correctAnswersPercent thay vì correctAnswersPercentage

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 mb-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-indigo-700">QUÁ TRÌNH HỌC TẬP</h1>
                <div className="text-xl font-semibold mb-4 text-center text-indigo-600">KHÓA HỌC TỐT TIẾNG VIỆT 1</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Gauge value={completionPercentage} maxValue={100} label="HỌC THEO BÀI" />
                    <Gauge value={correctAnswersPercentage} maxValue={100} label="ĐÃ LÀM ĐÚNG" />
                </div>
            </div>
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">LỊCH SỬ HỌC TẬP KHÓA HỌC TỐT TIẾNG VIỆT 1</h2>
                <p className="text-center mb-4">24/12/2019 - 31/12/2019</p>
                <HistoryChart data={historyData} />
            </div>
        </div>
    );
};

export default Process;
