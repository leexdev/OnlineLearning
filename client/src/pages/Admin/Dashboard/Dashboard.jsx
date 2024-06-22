import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2'; // Import Pie
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    ArcElement,
    TimeScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import paymentApi from '~/api/paymentApi';
import userCourseApi from '~/api/userCourseApi';
import courseApi from '~/api/courseApi';
import userApi from '~/api/userApi';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Đăng ký các thành phần của Chart.js và plugin zoom
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    ArcElement,
    TimeScale,
    zoomPlugin,
);

const Dashboard = () => {
    const [combinedChartData, setCombinedChartData] = useState({});
    const [revenueLineChartData, setRevenueLineChartData] = useState({});
    const [studentPieChartData, setStudentPieChartData] = useState({});
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
    const [totalRegisteredUsers, setTotalRegisteredUsers] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [payments, userCourses, courses, users] = await Promise.all([
                    paymentApi.getAll(startDate, endDate),
                    userCourseApi.getAll(startDate, endDate),
                    courseApi.getAll(startDate, endDate),
                    userApi.getUsers(startDate, endDate),
                ]);

                console.log('payments', payments);
                console.log('userCourses', userCourses);
                console.log('courses', courses);
                console.log('users', users);

                if (
                    payments &&
                    Array.isArray(payments) &&
                    userCourses &&
                    Array.isArray(userCourses) &&
                    courses &&
                    Array.isArray(courses) &&
                    users &&
                    Array.isArray(users)
                ) {
                    const successfulPayments = payments.filter((payment) => payment.status === 'Thành công');

                    const groupedPayments = successfulPayments.reduce((acc, payment) => {
                        if (!acc[payment.courseId]) {
                            acc[payment.courseId] = { courseName: payment.courseName, totalAmount: 0 };
                        }
                        acc[payment.courseId].totalAmount += payment.amount;
                        return acc;
                    }, {});

                    const groupedUserCourses = userCourses.reduce((acc, userCourse) => {
                        if (!acc[userCourse.courseId]) {
                            acc[userCourse.courseId] = 0;
                        }
                        acc[userCourse.courseId] += 1;
                        return acc;
                    }, {});

                    const courseNames = Object.values(groupedPayments).map((payment) => payment.courseName);
                    const amounts = Object.values(groupedPayments).map((payment) => payment.totalAmount);
                    const studentCounts = Object.values(groupedUserCourses);

                    const groupedByDate = successfulPayments.reduce((acc, payment) => {
                        const date = format(new Date(payment.createdAt), 'dd/MM/yyyy', { locale: vi });
                        if (!acc[date]) {
                            acc[date] = 0;
                        }
                        acc[date] += payment.amount;
                        return acc;
                    }, {});

                    const dates = Object.keys(groupedByDate);
                    const dailyAmounts = Object.values(groupedByDate);

                    setCombinedChartData({
                        labels: courseNames,
                        datasets: [
                            {
                                type: 'bar',
                                label: 'Doanh thu',
                                data: amounts,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                yAxisID: 'y',
                            },
                            {
                                type: 'line',
                                label: 'Số lượng học viên',
                                data: studentCounts,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                fill: true,
                                yAxisID: 'y1',
                            },
                        ],
                    });

                    setRevenueLineChartData({
                        labels: dates,
                        datasets: [
                            {
                                label: 'Doanh thu hàng ngày',
                                data: dailyAmounts,
                                borderColor: 'rgba(54, 162, 235, 1)',
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                fill: true,
                            },
                        ],
                    });

                    setStudentPieChartData({
                        labels: courseNames,
                        datasets: [
                            {
                                label: 'Tỉ lệ học viên',
                                data: studentCounts,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                    'rgba(255, 159, 64, 0.6)',
                                ],
                            },
                        ],
                    });

                    setTotalStudents(users.length);
                    setTotalCourses(courses.length);
                    setTotalPayments(successfulPayments.length);
                    setTotalRegisteredUsers(users.length);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex flex-col items-center bg-white rounded-lg shadow p-4 w-48">
                    <FontAwesomeIcon icon={faUser} className="text-4xl text-gray-500 mb-2" />
                    <p className="text-xl font-bold">{totalRegisteredUsers}</p>
                    <p className="text-gray-500">Người dùng đã đăng ký</p>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg shadow p-4 w-48">
                    <p className="text-xl font-bold">{totalStudents}</p>
                    <p className="text-gray-500">Học viên</p>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg shadow p-4 w-48">
                    <p className="text-xl font-bold">{totalCourses}</p>
                    <p className="text-gray-500">Khoá học</p>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg shadow p-4 w-48">
                    <p className="text-xl font-bold">{totalPayments}</p>
                    <p className="text-gray-500">Giao dịch</p>
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Ngày bắt đầu"
                    className="mr-2"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Ngày kết thúc"
                />
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-8">
                <h2 className="text-2xl font-bold mb-4">Doanh thu & Học viên</h2>
                <Bar
                    data={combinedChartData}
                    options={{
                        responsive: true,
                        plugins: { zoom: { zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' } } },
                    }}
                />
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-8">
                <h2 className="text-2xl font-bold mb-4">Doanh thu hàng ngày</h2>
                <Line
                    data={revenueLineChartData}
                    options={{
                        responsive: true,
                        plugins: { zoom: { zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' } } },
                    }}
                />
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-2xl font-bold mb-4">Tỉ lệ học viên theo khoá học</h2>
                <Pie data={studentPieChartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default Dashboard;
