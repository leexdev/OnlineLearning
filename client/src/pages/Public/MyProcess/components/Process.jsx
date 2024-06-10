import React, { useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { format, formatInTimeZone, toZonedTime } from 'date-fns-tz';
import userAnswerApi from '~/api/userAnswerApi';
import lessonCompletedApi from '~/api/lessonCompletedApi';
import lessonApi from '~/api/lessonApi';
import questionApi from '~/api/questionApi';
import Spinner from '~/components/Common/Spinner';
import HistoryChart from './HistoryChart';
import Gauge from './Gauge';
import RecentWrongAnswers from './RecentWrongAnswers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Process = ({ courseId, courseName }) => {
    const [historyData, setHistoryData] = useState(null);
    const [completedLessons, setCompletedLessons] = useState(0);
    const [totalLessons, setTotalLessons] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
    const [recentWrongAnswers, setRecentWrongAnswers] = useState([]);
    const [startDate, setStartDate] = useState(addDays(new Date(), -7));
    const [endDate, setEndDate] = useState(new Date());

    const timeZone = 'Asia/Ho_Chi_Minh';

    const toISOStringWithTimezone = (date) => {
        const zonedDate = toZonedTime(date, timeZone);
        return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { timeZone });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [history, lessonsCompleted, lessonTotal, questionTotal, correctAnswers, wrongAnswers] =
                    await Promise.all([
                        userAnswerApi.getUserAnswerHistory(
                            courseId,
                            toISOStringWithTimezone(startDate),
                            toISOStringWithTimezone(endDate),
                        ),
                        lessonCompletedApi.getLessonCompletedByUser(courseId),
                        lessonApi.getByCourseId(courseId),
                        questionApi.getByCourseId(courseId),
                        userAnswerApi.getCorrectAnswers(),
                        userAnswerApi.getRecentUncorrectedWrongAnswers(courseId, 1, 10),
                    ]);

                console.log('History:', history);
                console.log('Lessons Completed:', lessonsCompleted);
                console.log('Total Lessons:', lessonTotal);
                console.log('Total Questions:', questionTotal);
                console.log('Correct Answers:', correctAnswers);
                console.log('Wrong Answers:', wrongAnswers);

                processHistoryData(history);
                setCompletedLessons(lessonsCompleted.length);
                setTotalLessons(lessonTotal.length);
                setTotalQuestions(questionTotal.length);
                setTotalCorrectAnswers(Object.values(correctAnswers).filter(Boolean).length);
                setRecentWrongAnswers(wrongAnswers);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [courseId, startDate, endDate]);

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

        setHistoryData({ labels, totalQuestions, correctAnswers, wrongAnswers });
    };

    if (!historyData) return <Spinner />;

    console.log(historyData);

    const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const correctAnswersPercentage = totalQuestions > 0 ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0;

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 mb-6">
                <h1 className="text-3xl font-bold text-center mb-6 uppercase">Quá trình học tập</h1>
                <div className="text-xl font-semibold mb-4 text-center uppercase">{courseName}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Gauge value={completionPercentage} maxValue={100} label="HỌC THEO BÀI" />
                    <Gauge value={correctAnswersPercentage} maxValue={100} label="ĐÃ LÀM ĐÚNG" />
                </div>
            </div>
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 mb-6">
                <h2 className="text-2xl font-bold text-center mb-6 uppercase">Lịch sử học tập {courseName}</h2>
                <div className="md:flex items-center justify-center font-bold mb-4 space-x-4">
                    <div className="start-day">
                        <span className="mr-2">Từ:</span>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            className="p-2 border font-semibold border-gray-300 rounded focus:outline-none focus:border-peach focus:ring-peach"
                        />
                    </div>
                    <div className="end-day">
                        <span className="mr-2">Đến:</span>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                            minDate={startDate}
                            maxDate={new Date()}
                            className="p-2 mr-4 font-semibold border border-gray-300 rounded focus:outline-none focus:border-peach focus:ring-peach"
                        />
                    </div>
                </div>
                <HistoryChart data={historyData} />
            </div>
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">NHỮNG CÂU LÀM SAI GẦN ĐÂY</h2>
                <RecentWrongAnswers courseId={courseId} />
            </div>
        </div>
    );
};

export default Process;
