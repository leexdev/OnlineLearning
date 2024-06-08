import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const HistoryChart = ({ data }) => {

    console.log(data);
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Số câu đã làm',
                data: data.totalQuestions,
                borderColor: '#4c51bf',
                backgroundColor: 'rgba(76, 81, 191, 0.2)',
                fill: true,
            },
            {
                label: 'Số câu làm sai',
                data: data.wrongAnswers,
                borderColor: '#ecc94b',
                backgroundColor: 'rgba(236, 201, 75, 0.2)',
                fill: true,
            },
            {
                label: 'Số câu làm đúng',
                data: data.correctAnswers,
                borderColor: '#48bb78',
                backgroundColor: 'rgba(72, 187, 120, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        plugins: {
            filler: {
                propagate: true, // hoặc false
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ngày',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Số câu',
                },
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div className="relative h-96 mt-5">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default HistoryChart;
