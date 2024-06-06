import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Gauge = ({ value, label, maxValue = 100, unit = '%' }) => {
    return (
        <div className="text-center">
            <div className="w-32 h-32 mx-auto">
                <CircularProgressbar
                    value={value}
                    maxValue={maxValue}
                    text={`${value}${unit}`}
                    styles={buildStyles({
                        pathColor: value > 0 ? '#007bff' : '#d6d6d6', // Adjust the color to blue
                        textColor: '#000',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#f8f8f8',
                        textSize: '16px', // Adjust the text size
                    })}
                />
            </div>
            <div className="mt-2 text-gray-700 text-lg font-semibold">{label}</div>
        </div>
    );
};

export default Gauge;
