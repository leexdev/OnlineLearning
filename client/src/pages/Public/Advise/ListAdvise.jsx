import React, { Fragment, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import adviseApi from '~/api/adviseApi';
import courseApi from '~/api/courseApi';
import SidebarUser from '~/components/Common/SidebarUser';
import AdviseTable from './components/AdviseTable';
import AuthContext from '~/context/AuthContext';
import Spinner from '~/components/Common/Spinner';

const ListAdvise = () => {
    const [advises, setAdvises] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <Spinner />;
    }

    useEffect(() => {
        const fetchAdvises = async () => {
            try {
                const response = await adviseApi.getByTeacher();
                setAdvises(response);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchAdvises();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseApi.getCoursesByTeacher();
                setCourses(response);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu khóa học:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            const updatedAdvise = await adviseApi.update(id, { status });
            setAdvises(advises.map((advise) => (advise.id === id ? updatedAdvise : advise)));
            toast.success('Cập nhật trạng thái thành công');
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái.');
        }
    };

    const handleCourseChange = async (e) => {
        const courseId = e.target.value;
        setSelectedCourse(courseId);

        if (courseId) {
            try {
                const response = await adviseApi.getByCourseId(courseId);
                setAdvises(response);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu tư vấn theo khóa học:', error);
            }
        } else {
            const response = await adviseApi.getAll();
            setAdvises(response);
        }
    };

    return (
        <Fragment>
            <div className="container mx-auto p-4 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <SidebarUser user={user} />
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="mb-6 flex justify-between items-center">
                                <h2 className="text-3xl font-extrabold text-gray-900">Danh sách tư vấn</h2>
                                <div className="w-60">
                                    <select
                                        value={selectedCourse}
                                        onChange={handleCourseChange}
                                        className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-peach focus:border-peach sm:text-sm"
                                    >
                                        <option value="">Chọn khóa học</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>
                                                {course.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {advises.length > 0 ? (
                                <AdviseTable advises={advises} handleStatusChange={handleStatusChange} />
                            ) : (
                                <div className="text-center text-gray-500">Bạn chưa quản lý khóa học nào</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ListAdvise;
