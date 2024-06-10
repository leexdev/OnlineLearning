import React, { Fragment } from 'react';
import DropdownLink from './DropdownLink';

const UserDropdown = ({ user, onLogout }) => {
    return (
        <Fragment>
            <div
                className="absolute mt-[50px] right-0 md:mt-3 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg py-2 z-50"
                id="user-dropdown"
            >
                {user ? (
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900">{user.name}</span>
                        <span className="block text-sm text-gray-500 truncate">{user.email}</span>
                    </div>
                ) : (
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900">Đang tải...</span>
                    </div>
                )}
                <ul>
                    <DropdownLink to="/profile">Thông tin cá nhân</DropdownLink>
                    <DropdownLink to="/my-course">Khóa học của tôi</DropdownLink>
                    <DropdownLink to="/" onClick={onLogout}>
                        Đăng xuất
                    </DropdownLink>
                </ul>
            </div>
        </Fragment>
    );
};

export default UserDropdown;
