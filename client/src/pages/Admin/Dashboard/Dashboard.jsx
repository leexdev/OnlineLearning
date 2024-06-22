import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import paymentApi from '~/api/paymentApi';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const params = { PageSize: 10, Page: 1 }; // Thiết lập tham số cho API
            try {
                const response = await paymentApi.getAll(params);
                console.log('response', response); // Debug thông tin trả về từ API

                if (response.data && Array.isArray(response.data)) {
                    const payments = response.data;

                    // Gộp các khoản thanh toán có cùng courseId
                    const groupedPayments = payments.reduce((acc, payment) => {
                        if (!acc[payment.courseId]) {
                            acc[payment.courseId] = { courseName: payment.courseName, totalAmount: 0 };
                        }
                        acc[payment.courseId].totalAmount += payment.amount;
                        return acc;
                    }, {});

                    const courseNames = Object.values(groupedPayments).map((payment) => payment.courseName);
                    const amounts = Object.values(groupedPayments).map((payment) => payment.totalAmount);

                    setChartData({
                        labels: courseNames,
                        datasets: [
                            {
                                label: 'Số tiền',
                                data: amounts,
                                backgroundColor: 'rgba(75,192,192,0.6)',
                            },
                        ],
                    });
                } else {
                    console.error('Dữ liệu trả về từ API không đúng định dạng:', response);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Biểu đồ Thanh Toán</h2>
            {chartData && chartData.labels ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}
        </div>
    );
};

export default Dashboard;
