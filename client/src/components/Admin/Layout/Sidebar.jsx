import { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faBook,
    faBookOpen,
    faChartColumn,
    faGraduationCap,
    faImages,
    faList,
    faMoneyCheck,
    faRightFromBracket,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { NavLink, useLocation } from 'react-router-dom';
import AuthContext from '~/context/AuthContext';

const Sidebar = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const { pathname } = useLocation();
    const { logout } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (pathname.includes('/admin/grade') || pathname.includes('/admin/subject')) {
            setIsDropDownOpen(true);
        } else {
            setIsDropDownOpen(false);
        }
    }, [pathname]);

    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <div className="flex items-center">
                            <img className="w-20 p-2 rounded-full" src={images.user} alt="avatar" />
                            <div className="info ml-2">
                                <div className="name font-bold">{user?.name}</div>
                                <span className="text-gray-500 text-sm font-bold">Xin chào, {user?.role}</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/home"
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg group ${
                                    isActive
                                        ? 'text-white bg-gray-900'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <FontAwesomeIcon className="text-xl" icon={faChartColumn} />
                            <span className="ms-3 font-bold">Thống kê</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/banner"
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg group ${
                                    isActive
                                        ? 'text-white bg-gray-400'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <FontAwesomeIcon className="text-xl" icon={faImages} />
                            <span className="ms-3 font-bold">Quảng cáo</span>
                        </NavLink>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            onClick={toggleDropdown}
                        >
                            <FontAwesomeIcon className="text-xl" icon={faList} />
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">
                                Danh mục
                            </span>
                            {isDropDownOpen ? (
                                <FontAwesomeIcon icon={faAngleUp} />
                            ) : (
                                <FontAwesomeIcon icon={faAngleDown} />
                            )}
                        </button>
                        <ul className={`${isDropDownOpen ? 'block' : 'hidden'} py-1 space-y-2`}>
                            <li>
                                <NavLink
                                    to="/admin/grade"
                                    className={({ isActive }) =>
                                        `flex items-center w-full p-2 transition duration-75 rounded-lg pl-6 group ${
                                            isActive
                                                ? 'text-white bg-gray-400'
                                                : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`
                                    }
                                >
                                    <FontAwesomeIcon icon={faGraduationCap} />
                                    <span className="ms-3 font-semibold">Khối lớp</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/subject"
                                    className={({ isActive }) =>
                                        `flex items-center w-full p-2 transition duration-75 rounded-lg pl-6 group ${
                                            isActive
                                                ? 'text-white bg-gray-400'
                                                : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`
                                    }
                                >
                                    <FontAwesomeIcon icon={faBook} />
                                    <span className="ms-4 font-semibold">Môn học</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/course"
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg group ${
                                    isActive
                                        ? 'text-white bg-gray-400'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <FontAwesomeIcon className="text-xl" icon={faBookOpen} />
                            <span className="ms-3 font-bold">Khóa học</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/user"
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg group ${
                                    isActive
                                        ? 'text-white bg-gray-400'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <FontAwesomeIcon className="text-xl" icon={faUserGroup} />
                            <span className="ms-3 font-bold">Người dùng</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/payment"
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg group ${
                                    isActive
                                        ? 'text-white bg-gray-400'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <FontAwesomeIcon className="text-xl" icon={faMoneyCheck} />
                            <span className="ms-3 font-bold">Đơn mua khóa học</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            onClick={logout}
                            className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg group ${
                                    isActive
                                        ? 'text-white bg-gray-400'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <FontAwesomeIcon className="text-xl" icon={faRightFromBracket} />
                            <span className="ms-3 font-bold">Đăng xuất</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
