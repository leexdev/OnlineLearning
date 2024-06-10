import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseApi from '~/api/courseApi';
import paymentApi from '~/api/paymentApi';
import Spinner from '~/components/Common/Spinner';
import MessageModal from '~/components/Common/MessageModal';
import images from '~/assets/images';

const Payment = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayment = async (id) => {
            try {
                const courseData = await courseApi.getCourse(id);
                setCourse(courseData);

                const paymentStatus = await paymentApi.checkPaymentStatus(id);
                setIsPaid(paymentStatus.isPaid);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course details or payment status:', error);
            }
        };

        fetchPayment(id);
    }, [id]);

    const handlePayment = async () => {
        try {
            const paymentDto = { CourseId: id };

            const data = await paymentApi.generatePaymentUrl(paymentDto);
            window.location.href = data.paymentUrl;
        } catch (error) {
            console.error('Error generating payment URL:', error);
        }
    };

    const handlePaymentResponse = async () => {
        try {
            const paymentResponse = await paymentApi.processPaymentResponse(window.location.search);
        } catch (error) {
            sessionStorage.setItem('paymentStatus', 'failure');
            navigate('/payment-failure');
        }
    };

    useEffect(() => {
        if (window.location.search.includes('paymentResponse')) {
            handlePaymentResponse();
        }
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (isPaid) {
        const handleClose = () => {
            navigate('/');
        };

        return (
            <MessageModal
                title="Lỗi"
                image={images.sadcat}
                message="Khóa học đã được thanh toán. Bạn không thể thanh toán lại."
                onClose={handleClose}
            />
        );
    }

    return (
        <div className="lg:min-h-screen p-4 md:p-0 bg-gradient-to-r bg-sky-700 flex flex-col items-center justify-center mt-14">
            <div className="w-full max-w-4xl p-4 md:p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center text-red-600 mb-8 uppercase">Đăng ký {course?.name}</h1>
                <div className="text-center text-gray-700 mb-6">
                    <img src={course?.imageUrl} alt={course?.name} />
                </div>
                <div className="flex justify-center items-center font-bold text-2xl">
                    <span className="mr-2">Giá tiền: </span>
                    <div className="">
                        {course?.newPrice?.toLocaleString('vi-VN') ?? course?.price?.toLocaleString('vi-VN')}₫
                    </div>
                </div>
                <div className="my-6 text-center text-red-600">
                    <p>Sau khi bạn thanh toán thành công, bạn sẽ ngay lập tức được kích hoạt khóa học.</p>
                </div>
                <div className="flex justify-center">
                    <button onClick={handlePayment} className="bg-red-600 text-white py-2 px-8 rounded-full font-bold">
                        XÁC NHẬN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
