import React, { useContext, useState } from 'react';
import PasswordForm from './PasswordForm';
import ProfileForm from './ProfileForm';
import AuthContext from '~/context/AuthContext';
import Spinner from '~/components/Spinner';
import ProfileTabs from './ProfileTabs';

const Profile = () => {
    const { user, loading } = useContext(AuthContext);
    const [currentTab, setCurrentTab] = useState('profile');

    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="profile lg:col-span-2">
            <div className="p-3 md:p-6 bg-white rounded-lg shadow-md">
                <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
                {currentTab === 'profile' && <ProfileForm user={user} />}
                {currentTab === 'password' && <PasswordForm />}
            </div>
        </div>
    );
};

export default Profile;
