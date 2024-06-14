import React from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const PaymentSuccess = () => {
    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center mt-14">
            <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg text-center">
                <h1 className="text-2xl font-bold text-green-600">Thanh toán thành công!</h1>
                <div className="flex justify-center my-8">
                    <img className="w-44 h-56" src={images.cat} alt="Thanh toán thành công" />
                </div>
                <p className="text-green-600 font-bold">Cảm ơn bạn đã đăng ký khóa học của chúng tôi.</p>
                <p className="text-gray-700">Khóa học của bạn sẽ được kích hoạt ngay lập tức.</p>
                <div className="my-5">
                    <Link to="/my-course" className="p-2 bg-peach text-white rounded-xl text-xl font-bold">
                        Khóa học của tôi
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
