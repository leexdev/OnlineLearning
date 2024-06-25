import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faChartSimple, faMessage } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import ProfilePicture from '../../pages/Public/Profile/component/ProfilePicture';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';

const SidebarUser = ({ user, previewSrc, loadFile }) => {
    console.log(user);
    return (
        <div className="sidebar">
            <div className="flex flex-col items-center shadow-md bg-white rounded-xl py-5">
                <ProfilePicture user={user} previewSrc={previewSrc} loadFile={loadFile} />
                <h1 className="mt-5 font-medium">{user?.name}</h1>
                <div className="navbar mt-5">
                    <ul className="space-y-4 text-left">
                        <li className="p-3">
                            <NavLink
                                to={`/profile`}
                                className={({ isActive }) =>
                                    `p-3 uppercase ${
                                        isActive
                                            ? 'border-2 border-peach rounded-lg font-bold text-peach'
                                            : 'hover:text-peach hover:font-bold'
                                    }`
                                }
                                style={({ isActive }) => (isActive ? { padding: 'calc(0.75rem - 2px)' } : {})}
                            >
                                <FontAwesomeIcon className="mr-2" icon={faUser} />
                                <span className="font-semibold">Thông tin cá nhân</span>
                            </NavLink>
                        </li>
                        {user?.role === 'User' && (
                            <li className="p-3 !mt-0">
                                <NavLink
                                    to="/my-course"
                                    className={({ isActive }) =>
                                        `p-3 uppercase ${
                                            isActive
                                                ? 'border-2 border-peach rounded-lg font-bold text-peach'
                                                : 'hover:text-peach hover:font-bold'
                                        }`
                                    }
                                    style={({ isActive }) => (isActive ? { padding: 'calc(0.75rem - 2px)' } : {})}
                                >
                                    <FontAwesomeIcon className="mr-2" icon={faBookOpen} />
                                    <span className="font-semibold">Khóa học của tôi</span>
                                </NavLink>
                            </li>
                        )}
                        {user?.role === 'Teacher' && (
                            <li className="p-3 !mt-0">
                                <NavLink
                                    to="/my-advise"
                                    className={({ isActive }) =>
                                        `p-3 uppercase ${
                                            isActive
                                                ? 'border-2 border-peach rounded-lg font-bold text-peach'
                                                : 'hover:text-peach hover:font-bold'
                                        }`
                                    }
                                    style={({ isActive }) => (isActive ? { padding: 'calc(0.75rem - 2px)' } : {})}
                                >
                                    <FontAwesomeIcon className="mr-2" icon={faChartSimple} />
                                    <span className="font-semibold">Danh sách tư vấn</span>
                                </NavLink>
                            </li>
                        )}
                        <li className="p-3 !mt-0">
                            <NavLink
                                to="/chat"
                                className={({ isActive }) =>
                                    `p-3 uppercase ${
                                        isActive
                                            ? 'border-2 border-peach rounded-lg font-bold text-peach'
                                            : 'hover:text-peach hover:font-bold'
                                    }`
                                }
                                style={({ isActive }) => (isActive ? { padding: 'calc(0.75rem - 2px)' } : {})}
                            >
                                <FontAwesomeIcon className="mr-2" icon={faMessage} />
                                <span className="font-semibold">
                                    Nhắn tin {user?.role === 'Teacher' ? 'học viên' : 'giáo viên'}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SidebarUser;
