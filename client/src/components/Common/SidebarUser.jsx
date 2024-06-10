import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import ProfilePicture from '../../pages/Public/Profile/component/ProfilePicture';

const SidebarUser = ({ user, previewSrc, loadFile }) => {
    return (
        <div className="sidebar">
            <div className="flex flex-col items-center shadow-md bg-white rounded-xl py-5">
                <ProfilePicture user={user} previewSrc={previewSrc} loadFile={loadFile} />
                <h1 className="mt-5 font-medium">{user.name}</h1>
                <div className="navbar mt-5">
                    <ul className="space-y-4 text-left">
                        <li className="p-3">
                            <NavLink
                                to="/profile"
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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SidebarUser;
