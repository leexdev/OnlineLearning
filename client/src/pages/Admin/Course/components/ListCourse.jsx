import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import courseApi from '~/api/courseApi';
import DeleteModal from './Course/DeleteModal';
import CourseTable from './Course/CourseTable';
import Pagination from '~/components/Admin/Layout/Pagination';

const ListCourse = ({ searchTerm, resetPageOnSearch }) => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        setCurrentPage(page);
        fetchCourses(page, searchTerm);
    }, [location, searchTerm]);

    useEffect(() => {
        if (resetPageOnSearch) {
            setCurrentPage(1);
            navigate('?page=1');
        }
    }, [searchTerm, resetPageOnSearch, navigate]);

    const fetchCourses = async (page, searchTerm = '') => {
        try {
            const response = await courseApi.getAll({ page, pageSize: 10, searchTerm });
            setCourses(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            toast.error('Lỗi khi tải khóa học');
        }
    };

    const handleAddDiscount = async (id, price) => {
        try {
            const response = await courseApi.updatePrice(id, price);
            setCourses((prevCourses) => prevCourses.map((course) => (course.id === id ? response : course)));
            toast.success('Giá mới được tạo thành công');
        } catch (error) {
            toast.error('Lỗi khi tạo giá mới');
        }
    };

    const handleDeleteDiscount = async (id) => {
        try {
            const response = await courseApi.deleteNewPrice(id);
            setCourses((prevCourses) => prevCourses.map((course) => (course.id === id ? response : course)));
            toast.success('Xóa giá thành công');
        } catch (error) {
            toast.error('Xóa giá thất bại');
        }
    };

    const handleDelete = async () => {
        try {
            await courseApi.delete(courseToDelete.id);
            setCourses(courses.filter((course) => course.id !== courseToDelete.id));
            setShowDeleteModal(false);
            toast.success('Xóa khóa học thành công');
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate(`?page=${page}`);
    };

    return (
        <div className="p-4 bg-white rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Danh sách khóa học</h1>
                <Link
                    to="/admin/course/create"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                >
                    Thêm khóa học
                </Link>
            </div>
            <CourseTable
                courses={courses}
                handleAddDiscount={handleAddDiscount}
                handleDeleteDiscount={handleDeleteDiscount}
                setCourseToDelete={setCourseToDelete}
                setShowDeleteModal={setShowDeleteModal}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {showDeleteModal && (
                <DeleteModal item={courseToDelete} onDelete={handleDelete} onCancel={() => setShowDeleteModal(false)} />
            )}
        </div>
    );
};

export default ListCourse;
