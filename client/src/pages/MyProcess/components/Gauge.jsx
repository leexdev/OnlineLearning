const Gauge = ({ value, label }) => {
    return (
        <div className="text-center">
            <div className="relative w-24 h-12 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-gray-400"
                    style={{ width: `${value}%` }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-black">
                    {value}%
                </div>
            </div>
            <div className="mt-2 text-gray-700">{label}</div>
        </div>
    );
};
 
export default Gauge ;