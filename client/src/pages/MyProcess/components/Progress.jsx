import Gauge from "./Gauge";

const Process = () => {
    return (
        <div className="container mx-auto p-3 md:p-6">
            <h1 className="text-3xl font-bold mb-4">QUÁ TRÌNH HỌC TẬP</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
                    <div className="text-xl font-semibold mb-4 text-center">KHÓA HỌC TỐT TIẾNG VIỆT 1</div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <Gauge value={0} label="HỌC THEO BÀI" />
                        <Gauge value={0} label="ĐÃ LÀM ĐÚNG" />
                        <Gauge value={0} label="ĐIỂM TRUNG BÌNH" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Process;
