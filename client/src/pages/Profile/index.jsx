import { faBookOpen, faChartSimple, faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import images from '~/assets/images';

const Profile = () => {
    const [previewSrc, setPreviewSrc] = useState(images.user); // Đường dẫn mặc định của ảnh
    const [currentTab, setCurrentTab] = useState('profile'); // State để quản lý tab hiện tại

    const loadFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreviewSrc(previewURL);
            event.target.value = null;
        }
    };

    return (
        <div className="container md:p-10 text-center">
            <div className="md:grid lg:grid-cols-3 md:gap-6">
                <div className="sidebar">
                    <div className="flex flex-col items-center bg-white rounded-xl py-5">
                        <div className="avatar relative">
                            <label className="cursor-pointer relative group">
                                <img
                                    id="preview_img"
                                    className="h-28 w-28 object-cover rounded-full transition duration-300 group-hover:brightness-75"
                                    src={previewSrc}
                                    alt="Current profile photo"
                                />
                                <input
                                    type="file"
                                    onChange={loadFile}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full">
                                    <FontAwesomeIcon
                                        icon={faCamera}
                                        className="h-6 w-6 text-gray-700"
                                    />
                                </div>
                            </label>
                        </div>
                        <h1 className="mt-5 font-medium">Nguyễn Ngọc Lễ</h1>
                        <div className="navbar mt-5">
                            <ul className="space-y-4 text-left">
                                <li className="p-3">
                                    <a
                                        href="#"
                                        className="p-3 uppercase text-peach rounded-xl border font-bold border-peach active:font-bold"
                                    >
                                        <FontAwesomeIcon className="mr-2" icon={faUser} />
                                        <span>Thông tin cá nhân</span>
                                    </a>
                                </li>
                                <li className="p-3 !mt-0">
                                    <a href="#" className="p-3 uppercase font-medium hover:text-peach hover:font-bold">
                                        <FontAwesomeIcon className="mr-2" icon={faBookOpen} />
                                        <span>Khóa học của tôi</span>
                                    </a>
                                </li>
                                <li className="p-3 !mt-0">
                                    <a href="#" className="p-3 uppercase font-medium hover:text-peach hover:font-bold">
                                        <FontAwesomeIcon className="mr-2" icon={faChartSimple} />
                                        Quá trình học tập
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="profile lg:col-span-2">
                    <div className="p-3 md:p-6 bg-white rounded-lg shadow-md">
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
                        {currentTab === 'profile' && (
                            <form>
                                <div className="mb-4 text-left md:text-center md:flex items-center">
                                    <label htmlFor="email" className="md:w-1/4 text-gray-700 text-sm font-bold">
                                        Địa chỉ Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value="lepro2883@gmail.com"
                                        className="w-full mt-1 md:w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                                        disabled
                                    />
                                </div>
                                <div className="mb-4 text-left md:text-center md:flex items-center">
                                    <label htmlFor="name" className="md:w-1/4 text-gray-700 text-sm font-bold">
                                        Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="w-full mt-1 md:w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-peach focus:ring-peach"
                                    />
                                </div>
                                <div className="mb-4 text-left md:text-center md:flex items-center">
                                    <label htmlFor="phone" className="md:w-1/4 text-gray-700 text-sm font-bold">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="w-full mt-1 md:w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-peach focus:ring-peach"
                                    />
                                </div>
                                <div className="mb-4 text-left md:text-center md:flex items-center">
                                    <label htmlFor="date" className="md:w-1/4 text-gray-700 text-sm font-bold">
                                        Ngày sinh
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="w-full mt-1 md:w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-peach focus:ring-peach"
                                    />
                                </div>
                                <div className="mb-4 text-left md:text-center md:flex items-center">
                                    <label className="w-1/4 text-gray-700 text-sm font-bold">Giới tính</label>
                                    <div className="w-3/4 flex items-center space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                className="form-radio text-peach focus:ring-peach"
                                                checked
                                            />
                                            <span className="ml-2">Nam</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                className="form-radio text-peach focus:ring-peach"
                                            />
                                            <span className="ml-2">Nữ</span>
                                        </label>
                                    </div>
                                </div>
                                <button className="mt-5 py-2 px-10 bg-peach text-white rounded-3xl uppercase font-bold shadow-md">
                                    Cập nhật
                                </button>
                            </form>
                        )}
                        {currentTab === 'password' && (
                            <form>
                                <div className="mb-4 text-left md:text-center md:flex items-center">
                                    <label htmlFor="current_password" className="md:w-1/4 text-gray-700 text-sm font-bold">
                                        Mật khẩu hiện tại
                                    </label>
                                    <input
                                        type="password"
                                        name="current_password"
                                        id="current_password"
                                        className="w-full mt-1 md:w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-peach focus:ring-peach"
                                    />
                                </div>
                                <div className="mb-4 text-left md:text-center md:flex items-center">
                                    <label htmlFor="new_password" className="md:w-1/4 text-gray-700 text-sm font-bold">
                                        Mật khẩu mới
                                    </label>
                                    <input
                                        type="password"
                                        name="new_password"
                                        id="new_password"
                                        className="w-full mt-1 md:w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-peach focus:ring-peach"
                                    />
                                </div>
                                <div className="mb-4 text-left md:text-center md:flex items-center">
                                    <label htmlFor="confirm_password" className="md:w-1/4 text-gray-700 text-sm font-bold">
                                        Xác nhận mật khẩu mới
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        id="confirm_password"
                                        className="w-full mt-1 md:w-3/4 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-peach focus:ring-peach"
                                    />
                                </div>
                                <button className="mt-5 py-2 px-10 bg-peach text-white rounded-3xl uppercase font-bold shadow-md">
                                    Đổi mật khẩu
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
