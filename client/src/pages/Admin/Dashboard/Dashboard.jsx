import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
import { format, subDays, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookOpen,
    faCreditCard,
    faGraduationCap,
    faUser,
    faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

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
    const [combinedChartData, setCombinedChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [revenueLineChartData, setRevenueLineChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
    const [totalRegisteredUsers, setTotalRegisteredUsers] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [startDate, setStartDate] = useState(subDays(new Date(), 7));
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {};
                const [payments, userCourses, courses, users, teachers] = await Promise.all([
                    paymentApi.getAll(params),
                    userCourseApi.getAll(),
                    courseApi.getAll(),
                    userApi.getUsers(),
                    userApi.getTeachers(),
                ]);

                console.log('payments', payments);
                console.log('userCourses', userCourses);
                console.log('courses', courses);
                console.log('users', users);
                console.log('teachers', teachers);

                if (
                    payments &&
                    Array.isArray(payments) &&
                    userCourses &&
                    Array.isArray(userCourses) &&
                    courses &&
                    Array.isArray(courses) &&
                    users &&
                    Array.isArray(users) &&
                    teachers &&
                    Array.isArray(teachers)
                ) {
                    const successfulPayments = payments.filter((payment) => payment.status === 'Thành công');

                    const groupedPayments = successfulPayments.reduce((acc, payment) => {
                        if (!acc[payment.courseId]) {
                            acc[payment.courseId] = { courseName: payment.courseName, totalAmount: 0 };
                        }
                        acc[payment.courseId].totalAmount += payment.amount;
                        return acc;
                    }, {});

                    const studentUserCourses = userCourses.filter((userCourse) => !userCourse.isTeacher);
                    const groupedUserCourses = studentUserCourses.reduce((acc, userCourse) => {
                        if (!acc[userCourse.courseId]) {
                            acc[userCourse.courseId] = 0;
                        }
                        acc[userCourse.courseId] += 1;
                        return acc;
                    }, {});

                    const uniqueStudentIds = new Set(studentUserCourses.map((userCourse) => userCourse.userId));

                    const courseNames = [];
                    const amounts = [];
                    const studentCounts = [];

                    courses.forEach((course) => {
                        const studentCount = groupedUserCourses[course.id] || 0;
                        if (studentCount > 0) {
                            courseNames.push(course.name);
                            amounts.push(groupedPayments[course.id] ? groupedPayments[course.id].totalAmount : 0);
                            studentCounts.push(studentCount);
                        }
                    });

                    const startOfDay = startDate
                        ? setMilliseconds(setSeconds(setMinutes(setHours(startDate, 0), 0), 0), 0)
                        : null;
                    const endOfDay = endDate
                        ? setMilliseconds(setSeconds(setMinutes(setHours(endDate, 23), 59), 59), 999)
                        : null;

                    const filteredPayments = successfulPayments.filter((payment) => {
                        const paymentDate = new Date(payment.createdAt);
                        return (!startDate || paymentDate >= startOfDay) && (!endDate || paymentDate <= endOfDay);
                    });

                    const groupedByDate = filteredPayments.reduce((acc, payment) => {
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

                    setTotalStudents(uniqueStudentIds.size);
                    setTotalCourses(courses.length);
                    setTotalPayments(successfulPayments.length);
                    setTotalRegisteredUsers(users.length);
                    setTotalTeachers(teachers.length);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Thống kê</h1>
            <div className="grid grid-cols-5 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full flex items-center">
                    <FontAwesomeIcon icon={faUser} className="text-4xl text-blue-500 mr-4" />
                    <div>
                        <p className="text-2xl font-semibold">{totalRegisteredUsers}</p>
                        <p className="text-gray-600">Người dùng đã đăng ký</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 w-full flex items-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-green-500 mr-4" />
                    <div>
                        <p className="text-2xl font-semibold">{totalStudents}</p>
                        <p className="text-gray-600">Học viên</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 w-full flex items-center">
                    <FontAwesomeIcon icon={faBookOpen} className="text-4xl text-yellow-500 mr-4" />
                    <div>
                        <p className="text-2xl font-semibold">{totalCourses}</p>
                        <p className="text-gray-600">Khoá học</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 w-full flex items-center">
                    <FontAwesomeIcon icon={faCreditCard} className="text-4xl text-red-500 mr-4" />
                    <div>
                        <p className="text-2xl font-semibold">{totalPayments}</p>
                        <p className="text-gray-600">Giao dịch</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 w-full flex items-center">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="text-4xl text-purple-500 mr-4" />
                    <div>
                        <p className="text-2xl font-semibold">{totalTeachers}</p>
                        <p className="text-gray-600">Giáo viên</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mb-4 items-center space-x-4">
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Từ ngày</span>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Ngày bắt đầu"
                        className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Đến ngày</span>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Ngày kết thúc"
                        className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-4 flex-1">
                    <h2 className="text-2xl font-bold mb-4">Doanh thu & Học viên</h2>
                    <Bar
                        data={combinedChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true,
                                        },
                                        mode: 'x',
                                    },
                                    pan: {
                                        enabled: false,
                                    },
                                },
                            },
                        }}
                    />
                </div>

                <div className="bg-white rounded-lg shadow p-4 flex-1">
                    <h2 className="text-2xl font-bold mb-4">Doanh thu hàng ngày</h2>
                    <Line
                        data={revenueLineChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true,
                                        },
                                        mode: 'x',
                                    },
                                    pan: {
                                        enabled: false,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
