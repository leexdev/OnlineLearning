import { faBook, faMessage, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import images from '~/assets/images';

const Header = () => {
    const location = useLocation();
    return (
        <nav className="bg-header text-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <Link to="/" className="space-x-3 rtl:space-x-reverse md:opacity-70 md:hover:opacity-100">
                    <img src={images.logo} className="h-12 mb-3" alt="Logo" />
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="flex text-sm rounded-full md:me-0 items-center"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                    >
                        <img
                            className="w-8 h-8 md:me-3 rounded-full border"
                            src="/docs/images/people/profile-picture-3.jpg"
                            alt="user photo"
                        />
                        <span className="hidden xl:block">
                            Chào em! <br />
                            Nguyễn Văn A
                        </span>
                    </button>
                    <div
                        className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                        id="user-dropdown"
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900">Nguyễn Văn A</span>
                            <span className="block text-sm  text-gray-500 truncate">NguyenVanA@gmail.com</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link to="/course" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Thông tin tài khoản
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-course" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Khóa học của tôi
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Quá trình học tập
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Kích hoạt khóa học
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Lịch sử kích hoạt
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Đăng xuất
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100  focus:bg-header"
                        aria-controls="navbar-user"
                        aria-expanded="false"
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto bg-cobalt md:bg-header md:order-1"
                    id="navbar-user"
                >
                    <ul className="flex flex-col font-bold p-4 md:p-0 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li
                            className={`hidden md:flex md:hover:opacity-100 ${
                                location.pathname === '/' ? 'md:opacity-100' : 'md:opacity-70'
                            }`}
                        >
                            <Link
                                to="/"
                                className="py-2 px-3 uppercase rounded md:p-0 flex items-center"
                                aria-current="page"
                            >
                                <FontAwesomeIcon className='text-xl mr-1' icon={faBook}/>
                                <span>Tự ôn luyện</span>
                            </Link>
                        </li>
                        <li
                            className={`hover:bg-header rounded md:bg-transparent md:hover:opacity-100 ${
                                location.pathname === '/source' ? 'md:opacity-100' : 'md:opacity-70'
                            }`}
                        >
                            <Link
                                to="/course"
                                className="py-2 px-3 uppercase rounded md:p-0 flex items-center"
                                aria-current="page"
                            >
                                <FontAwesomeIcon className='text-xl mr-1' icon={faSquarePen}/>
                                Góc học tập
                            </Link>
                        </li>
                        <li
                            className={`hover:bg-header rounded md:bg-transparent md:hover:opacity-100 ${
                                location.pathname === '/lesson' ? 'md:opacity-100' : 'md:opacity-70'
                            }`}
                        >
                            <Link
                                to="/lesson"
                                className="py-2 px-3 uppercase md:p-0 flex items-center "
                                aria-current="page"
                            >
                                <FontAwesomeIcon className='text-xl mr-1' icon={faMessage}/>
                                Hỏi đáp
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
