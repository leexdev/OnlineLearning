import {faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import userApi from '~/api/userApi';

const UserItem = ({ user, setUserToDelete, setShowDeleteModal }) => {
    const [selectedRoles, setSelectedRoles] = useState(user.roles);

    const handleRoleChange = async (event) => {
        const newRole = event.target.value;
        try {
            await userApi.changeRoles(user.id, [newRole]);
            setSelectedRoles([newRole]);
            toast.success('Thay đổi quyền thành công');
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi thay đổi quyền');
        }
    };

    return (
        <tr key={user.id} className="text-center even:bg-gray-50">
            <td className="py-2 border-b px-4">{user.name}</td>
            <td className="py-2 border-b px-4">{user.email}</td>
            <td className="py-2 border-b px-4">
                <div className="relative inline-block w-36">
                    <select
                        value={selectedRoles[0] || ''}
                        onChange={handleRoleChange}
                        className="block w-full bg-white border border-gray-300 hover:border-peach px-2 py-1 rounded shadow leading-tight focus:ring-peach focus:border-peach"
                    >
                        <option value="User">Người dùng</option>
                        <option value="Admin">Quản trị viên</option>
                        <option value="Teacher">Giáo viên</option>
                    </select>
                </div>
            </td>
            <td className="py-2 border-b px-4 space-x-2">
                <button
                    onClick={() => {
                        setUserToDelete(user);
                        setShowDeleteModal(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </td>
        </tr>
    );
};

export default UserItem;
