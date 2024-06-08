import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Gauge = ({ value, maxValue, label }) => {
    const percentage = Math.round(maxValue > 0 ? (value / maxValue) * 100 : 0);

    return (
        <div className="text-center p-4">
            <div className="w-32 h-32 mx-auto mb-2">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        pathColor: percentage > 0 ? '#4caf50' : '#d6d6d6',
                        textColor: '#333',
                        trailColor: '#f4f4f4',
                        backgroundColor: '#fff',
                        textSize: '16px',
                    })}
                />
            </div>
            <div className="text-gray-800 text-lg font-semibold">{label}</div>
        </div>
    );
};

export default Gauge;
