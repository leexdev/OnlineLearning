import React, { Fragment, useContext } from 'react';
import AuthContext from '~/context/AuthContext';
import CourseList from './components/CourseList'; // Đảm bảo đúng đường dẫn
import Spinner from '~/components/Spinner';
import SidebarUser from '~/components/SidebarUser';
import { Helmet } from 'react-helmet';

const MyCourse = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Spinner />; // Hiển thị khi đang tải
    }

    if (!user) {
        return <div>User not found</div>; // Hiển thị khi không tìm thấy người dùng
    }

    return (
        <Fragment>
            <Helmet>
                <title>Khóa học của tôi</title>
            </Helmet>
            <div className="container md:p-10 text-center">
                <div className="md:grid lg:grid-cols-3 md:gap-6">
                    <SidebarUser user={user} />
                    <div className="profile lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md">
                            <CourseList />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MyCourse;
