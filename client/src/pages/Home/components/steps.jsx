import { faBookReader, faSearch, faUserGraduate, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Steps = () => {
    return (
        <div className="steps-container container py-20">
            <div className="header mb-6">
                <h1 className="uppercase font-bold text-4xl text-center">Tham gia dễ dàng chỉ với 4 bước</h1>
            </div>
            <div className="items-center rounded-xl shadow-lg w-full grid grid-cols-1 md:grid-cols-4">
                <div className="overflow-hidden flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-white bg-yellow-300 p-3 rounded-tr-xl md:rounded-tr-none rounded-tl-xl flex items-center justify-center w-full">
                        Bước 1
                    </div>
                    <div className="text-base text-gray-900 p-3 rounded-b-xl flex items-center justify-center w-full">
                        <FontAwesomeIcon className="text-xl mr-1" icon={faSearch} />
                        <span className="uppercase text-lg font-bold py-10">Chọn khóa học</span>
                    </div>
                </div>
                <div className="overflow-hidden flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-white bg-header p-3 flex items-center justify-center w-full">
                        Bước 2
                    </div>
                    <div className="text-base text-gray-900 p-3 rounded-b-xl flex items-center justify-center w-full">
                        <FontAwesomeIcon className="text-xl mr-1" icon={faBookReader} />
                        <span className="uppercase text-lg font-bold py-10">Học thử miễn phí</span>
                    </div>
                </div>
                <div className="overflow-hidden flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-white bg-teal-400 p-3 flex items-center justify-center w-full">
                        Bước 3
                    </div>
                    <div className="text-base text-gray-900 p-3 rounded-b-xl flex items-center justify-center w-full">
                        <FontAwesomeIcon className="text-xl mr-1" icon={faWallet} />
                        <span className="uppercase text-lg font-bold py-10">Nộp học phí</span>
                    </div>
                </div>
                <div className="overflow-hidden flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-white bg-blue-500 p-3 md:rounded-tr-xl flex items-center justify-center w-full">
                        Bước 4
                    </div>
                    <div className="text-base text-gray-900 p-3 rounded-b-xl flex items-center justify-center w-full">
                        <FontAwesomeIcon className="text-xl mr-1" icon={faUserGraduate} />
                        <span className="uppercase text-lg font-bold py-10">Vào học</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Steps;
