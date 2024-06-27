import React, { useContext, useState } from 'react';
import { faClock, faHeadphonesSimple, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import AuthContext from '~/context/AuthContext';
import MessageModal from '~/components/Common/MessageModal';
import images from '~/assets/images';
import AdviseForm from './AdviseForm';

const Thumbnail = ({ course, setAdviseSuccess, user, hasPurchased }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showAdviseForm, setShowAdviseForm] = useState(false);

    const handleRegisterClick = () => {
        if (!user) {
            setError('Bạn cần đăng nhập để đăng ký khóa học');
        } else {
            navigate(`/payment/${course.id}`);
        }
    };

    const handleAdviseClick = () => {
        setShowAdviseForm(true);
    };

    const closeAdviseForm = () => {
        setShowAdviseForm(false);
    };

    const handleSetAdviseSuccess = (message) => {
        setAdviseSuccess(message);
    };

    const isAdmin = user?.role === 'Admin';

    return (
        <div className="w-full lg:w-1/3 float-right grid grid-cols-1 mb-10 lg:z-50 top-16">
            <div className="px-1">
                <div className="bg-white rounded-md pb-5">
                    <div className="thumbnail p-2">
                        <img src={course.imageUrl} alt={course.title} />
                    </div>
                    <div className="p-4">
                        <p className="text-lg">{course.title}</p>
                    </div>
                    {!hasPurchased && !isAdmin && (
                        <div className="content xs:px-2 md:px-7 text-right">
                            {course.newPrice ? (
                                <div>
                                    <div className="line-through text-2xl">
                                        <span className="old-price">{course.price.toLocaleString('vi-VN')}₫</span>
                                    </div>
                                    <div className="text-sm font-bold">
                                        <span className="mr-2">Chỉ còn</span>
                                        <span className="new-price text-5xl">
                                            {course.newPrice.toLocaleString('vi-VN')}₫
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm font-bold">
                                    <span className="mr-2">Giá chỉ</span>
                                    <span className="new-price text-5xl">{course.price.toLocaleString('vi-VN')}₫</span>
                                </div>
                            )}
                            <button
                                onClick={handleRegisterClick}
                                className="action-btn mt-2 flex justify-center items-center text-white bg-peach py-2 md:px-10 rounded-xl shadow-lg font-bold uppercase text-md md:text-xl w-full"
                            >
                                <FontAwesomeIcon className="mr-2 md:mr-4" icon={faUserPen}></FontAwesomeIcon>
                                <span>Đăng ký học</span>
                            </button>
                            <button
                                onClick={handleAdviseClick}
                                className="action-btn mt-3 flex justify-center items-center text-white bg-peach py-2 md:px-10 rounded-xl shadow-lg font-bold uppercase text-md md:text-xl w-full"
                            >
                                <FontAwesomeIcon className="mr-2 md:mr-4" icon={faHeadphonesSimple}></FontAwesomeIcon>
                                <span>Tư vấn thêm</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {error && <MessageModal message={error} title="Lỗi" image={images.sadcat} onClose={() => setError(null)} />}
            {showAdviseForm && (
                <AdviseForm courseId={course.id} onClose={closeAdviseForm} setAdviseSuccess={handleSetAdviseSuccess} />
            )}
        </div>
    );
};

export default Thumbnail;
