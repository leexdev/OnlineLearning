import { Link, useLocation } from 'react-router-dom';
import images from '~/assets/images';

const Header = () => {
    const location = useLocation();
    return (
        <nav className="bg-header text-white border-gray-200">
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
                    {/* Dropdown menu */}
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
                                <Link to="/source" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Thông tin tài khoản
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Khóa học của tôi
                                </a>
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
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.87207 2.00024H15.8721C19.8721 2.00024 20.8721 3.00024 20.8721 7.00024V12.5002C20.8721 13.0502 20.4221 13.5002 19.8721 13.5002H6.72207C5.63207 13.5002 4.63207 13.9102 3.87207 14.5802V7.00024C3.87207 3.00024 4.87207 2.00024 8.87207 2.00024ZM8.37207 10.7502H13.3721C13.7821 10.7502 14.1221 10.4102 14.1221 10.0002C14.1221 9.59024 13.7821 9.25024 13.3721 9.25024H8.37207C7.96207 9.25024 7.62207 9.59024 7.62207 10.0002C7.62207 10.4102 7.96207 10.7502 8.37207 10.7502ZM8.37207 7.25024H16.3721C16.7821 7.25024 17.1221 6.91024 17.1221 6.50024C17.1221 6.09024 16.7821 5.75024 16.3721 5.75024H8.37207C7.96207 5.75024 7.62207 6.09024 7.62207 6.50024C7.62207 6.91024 7.96207 7.25024 8.37207 7.25024ZM20.8721 18.5002V16.0002C20.8721 15.4502 20.4221 15.0002 19.8721 15.0002H6.72207C5.15207 15.0002 3.87207 16.2802 3.87207 17.8502V18.5002C3.87207 20.4302 5.44207 22.0002 7.37207 22.0002H17.3721C19.3021 22.0002 20.8721 20.4302 20.8721 18.5002Z"
                                        fill="#FFF"
                                    ></path>
                                </svg>
                                <span>Tự ôn luyện</span>
                            </Link>
                        </li>
                        <li
                            className={`hover:bg-header rounded md:bg-transparent md:hover:opacity-100 ${
                                location.pathname === '/source' ? 'md:opacity-100' : 'md:opacity-70'
                            }`}
                        >
                            <Link
                                to="/source"
                                className="py-2 px-3 uppercase rounded md:p-0 flex items-center"
                                aria-current="page"
                            >
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.5621 2.00049H8.18207C4.54207 2.00049 2.37207 4.17049 2.37207 7.81049V16.1805C2.37207 19.8305 4.54207 22.0005 8.18207 22.0005H16.5521C20.1921 22.0005 22.3621 19.8305 22.3621 16.1905V7.81049C22.3721 4.17049 20.2021 2.00049 16.5621 2.00049ZM11.3221 17.5105C11.0321 17.8005 10.4821 18.0805 10.0821 18.1405L7.62207 18.4905C7.53207 18.5005 7.44207 18.5105 7.35207 18.5105C6.94207 18.5105 6.56207 18.3705 6.29207 18.1005C5.96207 17.7705 5.82207 17.2905 5.90207 16.7605L6.25207 14.3005C6.31207 13.8905 6.58207 13.3505 6.88207 13.0605L11.3421 8.60049C11.4221 8.81049 11.5021 9.02049 11.6121 9.26049C11.7121 9.47049 11.8221 9.69049 11.9421 9.89049C12.0421 10.0605 12.1521 10.2205 12.2421 10.3405C12.3521 10.5105 12.4821 10.6705 12.5621 10.7605C12.6121 10.8305 12.6521 10.8805 12.6721 10.9005C12.9221 11.2005 13.2121 11.4805 13.4621 11.6905C13.5321 11.7605 13.5721 11.8005 13.5921 11.8105C13.7421 11.9305 13.8921 12.0505 14.0221 12.1405C14.1821 12.2605 14.3421 12.3705 14.5121 12.4605C14.7121 12.5805 14.9321 12.6905 15.1521 12.8005C15.3821 12.9005 15.5921 12.9905 15.8021 13.0605L11.3221 17.5105ZM17.7421 11.0905L16.8221 12.0205C16.7621 12.0805 16.6821 12.1105 16.6021 12.1105C16.5721 12.1105 16.5321 12.1105 16.5121 12.1005C14.4821 11.5205 12.8621 9.90049 12.2821 7.87049C12.2521 7.76049 12.2821 7.64049 12.3621 7.57049L13.2921 6.64049C14.8121 5.12049 16.2621 5.15049 17.7521 6.64049C18.5121 7.40049 18.8821 8.13049 18.8821 8.89049C18.8721 9.61049 18.5021 10.3305 17.7421 11.0905Z"
                                        fill="#FFF"
                                    ></path>
                                </svg>
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
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M23.1221 4.00049C23.1221 5.51927 21.8909 6.75049 20.3721 6.75049C18.8533 6.75049 17.6221 5.51927 17.6221 4.00049C17.6221 2.48171 18.8533 1.25049 20.3721 1.25049C21.8909 1.25049 23.1221 2.48171 23.1221 4.00049ZM16.2221 4.96049C16.5621 6.53049 17.8421 7.81049 19.4121 8.15049C20.0221 8.28049 20.6121 8.28049 21.1721 8.18049C21.7921 8.06049 22.3721 8.52049 22.3721 9.15049V13.9605C22.3721 16.7205 20.1421 18.9505 17.3821 18.9505H15.8721C15.5521 18.9505 15.2621 19.1005 15.0721 19.3505L13.5721 21.3405C12.9121 22.2205 11.8321 22.2205 11.1721 21.3405L9.67207 19.3505C9.51207 19.1305 9.15207 18.9505 8.87207 18.9505H7.37207C4.61207 18.9505 2.37207 16.7105 2.37207 13.9505V7.00049C2.37207 4.24049 4.61207 2.00049 7.37207 2.00049H15.2221C15.8621 2.00049 16.3221 2.58049 16.1921 3.20049C16.0821 3.76049 16.0921 4.35049 16.2221 4.96049ZM7.37207 11.0005C7.37207 11.5505 7.81207 12.0005 8.37207 12.0005C8.93207 12.0005 9.37207 11.5505 9.37207 11.0005C9.37207 10.4505 8.92207 10.0005 8.37207 10.0005C7.81207 10.0005 7.37207 10.4505 7.37207 11.0005ZM11.3721 11.0005C11.3721 11.5505 11.8121 12.0005 12.3721 12.0005C12.9321 12.0005 13.3721 11.5505 13.3721 11.0005C13.3721 10.4505 12.9221 10.0005 12.3721 10.0005C11.8121 10.0005 11.3721 10.4505 11.3721 11.0005ZM15.3721 11.0005C15.3721 11.5505 15.8121 12.0005 16.3721 12.0005C16.9321 12.0005 17.3721 11.5505 17.3721 11.0005C17.3721 10.4505 16.9221 10.0005 16.3721 10.0005C15.8121 10.0005 15.3721 10.4505 15.3721 11.0005Z"
                                        fill="#FFF"
                                    ></path>
                                </svg>
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
