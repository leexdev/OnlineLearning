import React from 'react';
import DropdownLink from './DropdownLink';

const UserDropdown = ({ onLogout }) => {
    return (
        <div
            className="absolute mt-[50px] right-0 md:mt-3 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg py-2 z-50"
            id="user-dropdown"
        >
            <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">Nguyễn Văn A</span>
                <span className="block text-sm text-gray-500 truncate">NguyenVanA@gmail.com</span>
            </div>
            <ul>
                <DropdownLink to="/subject">Thông tin tài khoản</DropdownLink>
                <DropdownLink to="/my-course">Khóa học của tôi</DropdownLink>
                <DropdownLink to="#">Quá trình học tập</DropdownLink>
                <DropdownLink to="#">Kích hoạt khóa học</DropdownLink>
                <DropdownLink to="#">Lịch sử kích hoạt</DropdownLink>
                <DropdownLink to="/" onClick={onLogout}>Đăng xuất</DropdownLink>
            </ul>
        </div>
    );
};

export default UserDropdown;
