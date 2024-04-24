import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
const Home = () => {
    return (
        <Fragment>
            <div
                id="controls-carousel"
                className="relative h-40 xs:h-52 sm:h-80 lg:h-96 w-full xl:h-32.8 xxl:h-48.6"
                data-carousel="static"
            >
                <div className="relative h-full overflow-hidden">
                    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/05/e069_banner-thay-co-v2.png"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/04/13/d904_13.04.24_huongnt9_banner-download-app-android.ai.png"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/05/e069_banner-thay-co-v2.png"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/05/e069_banner-thay-co-v2.png"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/05/e069_banner-thay-co-v2.png"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
                    data-carousel-prev=""
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50">
                        <svg
                            className="w-4 h-4 text-white rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
                    data-carousel-next=""
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50">
                        <svg
                            className="w-4 h-4 text-white rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <div className="classBlock container mx-auto my-4 -mt-12 relative z-50">
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
                        <div className="thumbnail my-2">
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
                        <div className="thumbnail my-2">
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
                        <div className="thumbnail my-2">
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
                        <div className="thumbnail my-2">
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
                        <div className="thumbnail my-2">
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
                        <div className="thumbnail my-2">
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
            </div>
            <div className="searchBar container block mx-auto">
                <ul className="xl:mx-20 xxl:mx-48 py-3 rounded-lg items-center bg-sky-400 grid grid-cols-1 sm:grid-cols-4">
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
        </Fragment>
    );
};

export default Home;
