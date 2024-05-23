import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from 'react';

const Sidebar = () => {
    return (
        <Fragment>
            <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span className="sr-only">Open sidebar</span>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            <aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 left-auto right-0 z-40 w-52 sm:w-64 md:w-64 xl:w-96 transition-transform translate-x-full sm:translate-x-0 pt-[60px]"
                aria-label="Sidebar"
            >
                <div className="h-full overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium h-screen md:h-full">
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                                data-collapse-toggle="chappter-1"
                            >
                                <span className="flex-1 ms-3 text-left rtl:text-right">
                                    Chuyên đề 1: Các số và phép tính trong phạm vi 100
                                </span>
                                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                            </button>
                            <ul id="chappter-1" className="hidden space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 w-full text-gray-900 transition duration-75 rounded-lg pl-7 group hover:bg-gray-100 "
                                    >
                                        <span className='mr-2'>1.1</span>
                                        Bài toán que diêm
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 w-full text-gray-900 transition duration-75 rounded-lg pl-7 group hover:bg-gray-100 "
                                    >
                                        <span className='mr-2'>1.2</span>
                                        Bài toán xúc xắc (tiết 1)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 w-full text-gray-900 transition duration-75 rounded-lg pl-7 group hover:bg-gray-100 "
                                    >
                                        <span className='mr-2'>1.3</span>
                                        Bài toán xúc xắc (tiết 2)
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
        </Fragment>
    );
};

export default Sidebar;
