import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import userApi from '~/api/userApi';
import DeleteModal from './DeleteModal';
import UserTable from './UserTable';
import Pagination from '~/components/Admin/Layout/Pagination';

const ListUser = ({ searchTerm, resetPageOnSearch }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        setCurrentPage(page);
        fetchUsers(page, searchTerm);
    }, [location, searchTerm]);

    useEffect(() => {
        if (resetPageOnSearch) {
            setCurrentPage(1);
            navigate('?page=1');
        }
    }, [searchTerm, resetPageOnSearch, navigate]);

    const fetchUsers = async (page, searchTerm = '') => {
        try {
            const response = await userApi.getPage({ page, pageSize: 10, searchTerm });
            setUsers(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            toast.error('Lỗi khi tải người dùng');
        }
    };

    const handleDelete = async () => {
        try {
            await userApi.delete(userToDelete.id);
            setUsers(users.filter((user) => user.id !== userToDelete.id));
            setShowDeleteModal(false);
            toast.success('Xóa người dùng thành công');
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi xóa người dùng');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate(`?page=${page}`);
    };

    return (
        <div className="p-4 bg-white rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Quản lý người dùng</h1>
            </div>
            <UserTable users={users} setUserToDelete={setUserToDelete} setShowDeleteModal={setShowDeleteModal} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {showDeleteModal && (
                <DeleteModal
                    message="Bạn có chắc chắn muốn xóa người dùng này không?"
                    handleDelete={handleDelete}
                    setShowDeleteModal={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default ListUser;
