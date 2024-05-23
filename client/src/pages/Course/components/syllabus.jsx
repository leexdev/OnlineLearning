import { faChevronDown, faCircle, faCirclePlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Syllabus = () => {
    return (
        <div id="course-syllabus">
            <div className="header block lg:flex lg:justify-between mb-3">
                <div className="title text-4xl font-bold mb-5 lg:mb-0 text-center lg:text-start">Chương trình học</div>
                <form>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FontAwesomeIcon className="text-gray-400" icon={faSearch} />
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="w-full p-3 ps-10 text-lg text-gray-900 border font-bold border-gray-200 rounded-lg bg-white focus:ring-peach focus:border-peach"
                            placeholder="Tìm kiếm bài học"
                            required=""
                        />
                    </div>
                </form>
            </div>
            <div className="syllabus bg-white rounded-lg mb-20">
                <div className="syllabus-box-free">
                    <button
                        type="button"
                        className="flex border-b items-center w-full p-3 text-white font-semibold text-xl transition duration-75 rounded-t-lg group bg-cyan-500"
                        data-collapse-toggle="syllabus-free"
                        aria-expanded="true"
                    >
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                            Bài giảng miễn phí
                        </span>
                        <FontAwesomeIcon className="mr-3" icon={faChevronDown} />
                    </button>
                    <ul id="syllabus-free" className="py-2 space-y-2">
                        <li>
                            <a
                                href="#!"
                                className="block hover:text-peach w-full p-2 text-gray-900 transition duration-75 pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <p className="p-1">
                                    Điền số (tiết 4)
                                    <span className="float-right">
                                        <FontAwesomeIcon className="mr-3 text-2xl" icon={faCirclePlay} />
                                    </span>
                                </p>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#!"
                                className="block hover:text-peach w-full p-2 text-gray-900 transition duration-75 pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <p className="p-1">
                                    Quy luật số (tiết 3)
                                    <span className="float-right">
                                        <FontAwesomeIcon className="mr-3 text-2xl" icon={faCirclePlay} />
                                    </span>
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="syllabus-box">
                    <div className="syllabus-item rounded-b-lg">
                        <button
                            type="button"
                            className="flex border-b items-center w-full p-3 text-white font-semibold text-xl transition duration-75 group bg-cyan-500"
                            data-collapse-toggle="syllabus-1"
                            aria-expanded="true"
                        >
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                Chuyên đề 1: Tìm x
                            </span>
                            <FontAwesomeIcon className="mr-3" icon={faChevronDown} />
                        </button>
                        <ul id="syllabus-1" className="py-2 space-y-2">
                            <li>
                                <a
                                    href="#!"
                                    className="block hover:text-peach w-full p-2 text-gray-900 transition duration-75 pl-11 hover:bg-gray-100"
                                >
                                    <p className="p-1">
                                        <span className="text-lime-500 float-left mr-6">
                                            <FontAwesomeIcon className="text-2xl" icon={faCircle} />
                                        </span>
                                        Tìm x (tiết 1)
                                        <span className="float-right">
                                            <FontAwesomeIcon className="mr-3 text-2xl" icon={faCirclePlay} />
                                        </span>
                                    </p>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#!"
                                    className="block hover:text-peach w-full p-2 text-gray-900 transition duration-75 pl-11 hover:bg-gray-100"
                                >
                                    <p className="p-1">
                                        <span className="text-gray-300 float-left mr-6">
                                            <FontAwesomeIcon className="text-2xl" icon={faCircle} />
                                        </span>
                                        Tìm x (tiết 2)
                                        <span className="float-right">
                                            <FontAwesomeIcon className="mr-3 text-2xl" icon={faCirclePlay} />
                                        </span>
                                    </p>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#!"
                                    className="block hover:text-peach w-full p-2 text-gray-900 transition duration-75 pl-11 hover:bg-gray-100"
                                >
                                    <p className="p-1">
                                        <span className="text-gray-300 float-left mr-6">
                                            <FontAwesomeIcon className="text-2xl" icon={faCircle} />
                                        </span>
                                        Tìm x (tiết 3)
                                        <span className="float-right">
                                            <FontAwesomeIcon className="mr-3 text-2xl" icon={faCirclePlay} />
                                        </span>
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Syllabus;
