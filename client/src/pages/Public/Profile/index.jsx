import React, { Fragment, useContext, useState } from 'react';
import SidebarUser from '~/components/Common/SidebarUser';
import AuthContext from '~/context/AuthContext';
import Spinner from '~/components/Common/Spinner';
import Profile from './component/Profile';

const Account = () => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <Spinner />; // Hiển thị khi đang tải
    }

    if (!user) {
        return <div>User not found</div>; // Hiển thị khi không tìm thấy người dùng
    }

    return (
        <Fragment>
            <div className="container md:p-10 text-center">
                <div className="md:grid lg:grid-cols-3 md:gap-6">
                    <SidebarUser user={user} />
                    <div className="profile lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md">
                            <Profile />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Account;
