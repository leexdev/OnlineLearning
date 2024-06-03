const ProfileTabs = ({ currentTab, setCurrentTab }) => {
    return (
        <div className="md:flex md:justify-center border-b border-gray-200 mb-4">
            <button 
                className={`pb-2 mb-5 md:mb-0 mr-3 md:mr-10 font-medium ${currentTab === 'profile' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
                onClick={() => setCurrentTab('profile')}
            >
                THÔNG TIN CÁ NHÂN
            </button>
            <button 
                className={`pb-2 mb-5 md:mb-0 font-medium ${currentTab === 'password' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
                onClick={() => setCurrentTab('password')}
            >
                ĐỔI MẬT KHẨU
            </button>
        </div>
    );
};

export default ProfileTabs;
