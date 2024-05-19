import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Banner = () => {
    return (
        <div className="banner-container container">
            <div className="classBlock mx-auto my-4 -mt-12 relative z-50">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    <div className="thumbnail">
                        <div className="max-w-sm mx-1 bg-white rounded-lg shadow-xl">
                            <div className="title pt-4 px-5 pb-3 bg-red-400 rounded-t-lg">
                                <h2 className="text-center capitalize text-4xl font-bold">
                                    <a href="#" className="mb-2 tracking-tight text-white">
                                        Tiền lớp
                                        <span className="block mx-auto text-8xl"> 1</span>
                                    </a>
                                </h2>
                            </div>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Toán học
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>

                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700"
                            >
                                Tiếng Việt
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="max-w-sm mx-1 bg-white rounded-lg shadow-xl">
                            <div className="title pt-4 px-5 pb-3 bg-yellow-300 rounded-t-lg">
                                <h2 className="text-center capitalize text-4xl font-bold">
                                    <a href="#" className="mb-2 tracking-tight text-white">
                                        Lớp
                                        <span className="block mx-auto text-8xl"> 1</span>
                                    </a>
                                </h2>
                            </div>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Toán học
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Tiếng Việt
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700"
                            >
                                Tiếng Anh
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="max-w-sm mx-1 bg-white rounded-lg shadow-xl">
                            <div className="title pt-4 px-5 pb-3 bg-blue-500 rounded-t-lg">
                                <h2 className="text-center capitalize text-4xl font-bold">
                                    <a href="#" className="mb-2 tracking-tight text-white">
                                        Lớp
                                        <span className="block mx-auto text-8xl"> 2</span>
                                    </a>
                                </h2>
                            </div>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Toán học
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Tiếng Việt
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700"
                            >
                                Tiếng Anh
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="max-w-sm mx-1 bg-white rounded-lg shadow-xl">
                            <div className="title pt-4 px-5 pb-3 bg-teal-400 rounded-t-lg">
                                <h2 className="text-center capitalize text-4xl font-bold">
                                    <a href="#" className="mb-2 tracking-tight text-white">
                                        Lớp
                                        <span className="block mx-auto text-8xl"> 3</span>
                                    </a>
                                </h2>
                            </div>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Toán học
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Tiếng Việt
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700"
                            >
                                Tiếng Anh
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="max-w-sm mx-1 bg-white rounded-lg shadow-xl">
                            <div className="title pt-4 px-5 pb-3 bg-green-400 rounded-t-lg">
                                <h2 className="text-center capitalize text-4xl font-bold">
                                    <a href="#" className="mb-2 tracking-tight text-white">
                                        Lớp
                                        <span className="block mx-auto text-8xl"> 4</span>
                                    </a>
                                </h2>
                            </div>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Toán học
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Tiếng Việt
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700"
                            >
                                Tiếng Anh
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="max-w-sm mx-1 bg-white rounded-lg shadow-xl">
                            <div className="title pt-4 px-5 pb-3 bg-pink-500 rounded-t-lg">
                                <h2 className="text-center capitalize text-4xl font-bold">
                                    <a href="#" className="mb-2 tracking-tight text-white">
                                        Lớp
                                        <span className="block mx-auto text-8xl "> 5</span>
                                    </a>
                                </h2>
                            </div>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Toán học
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 border-b-2"
                            >
                                Tiếng Việt
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                            <a
                                href=""
                                className="px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700"
                            >
                                Tiếng Anh
                                <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="searchBar block mt-10 mx-auto">
                <ul className="py-3 rounded-lg items-center bg-sky-400 sm:flex justify-center">
                    <li className="text-xl font-bold text-white text-center md:text-end">Tìm bài giảng</li>
                    <li className="md:mx-5 text-center md:text-end">
                        <div className="selectBox py-2 sm:py-0">
                            <select className="rounded-xl border-none text-xl font-bold text-sky-600 px-10">
                                <option value="">Chọn lớp</option> <option value={14}>Tiền lớp 1</option>
                                <option value={1}>Lớp 1</option> <option value={2}>Lớp 2</option>
                                <option value={3}>Lớp 3</option> <option value={4}>Lớp 4</option>
                                <option value={5}>Lớp 5</option>
                            </select>
                        </div>
                    </li>
                    <li className="sm:mr-3 md:mr-5 text-center pb-2 sm:pb-0">
                        <div className="selectBox">
                            <select className="rounded-xl border-none text-xl font-bold text-sky-600 px-10">
                                <option value="">Chọn môn</option>
                            </select>
                        </div>
                    </li>
                    <li className="rounded-2xl text-xl font-bold text-center md:text-start text-white">
                        <button className="btn bg-header rounded-xl p-2 px-5">
                            <FontAwesomeIcon className="" icon={faSearch} />
                            <span className="glyphicon glyphicon-search" /> <span className="text">Tìm kiếm</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Banner;
