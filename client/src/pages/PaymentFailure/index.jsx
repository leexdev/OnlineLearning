import React from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const PaymentFailure = () => {
    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center mt-14">
            <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg text-center">
                <h1 className="text-2xl font-bold text-red-600">Thanh toán thất bại!</h1>
                <div className="flex justify-center my-8">
                    <img src={images.sadcat} alt="Thanh toán thất bại" />
                </div>
                <p className="text-red-600 font-bold">Có lỗi xảy ra trong quá trình thanh toán.</p>
                <p className="text-gray-700">Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ.</p>
                <div className="my-5">
                    <Link to="/" className="p-2 bg-peach text-white rounded-xl text-xl font-bold">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailure;
