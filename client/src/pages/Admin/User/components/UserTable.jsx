// components/UserTable.js
import React from 'react';
import UserItem from './UserItem';

const UserTable = ({ users, setUserToDelete, setShowDeleteModal }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-peach text-white">
                        <th className="py-3 px-4">Tên người dùng</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Vai trò</th>
                        <th className="py-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserItem
                            key={user.id}
                            user={user}
                            setUserToDelete={setUserToDelete}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
