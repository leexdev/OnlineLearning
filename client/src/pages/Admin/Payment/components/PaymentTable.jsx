import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PaymentTable = ({ payments }) => {
    const formatPrice = (price) => {
        if (!price) return '';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    console.log('payments', payments);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Người dùng</th>
                        <th className="py-2 px-4 border-b">Khóa học</th>
                        <th className="py-2 px-4 border-b">Số tiền</th>
                        <th className="py-2 px-4 border-b">Ngày đăng ký</th>
                        <th className="py-2 px-4 border-b">Trạng thái</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td className="py-2 px-4 border-b">{payment.userName}</td>
                            <td className="py-2 px-4 border-b">
                                <Link to={`/course/${payment.courseId}`}>{payment.courseName}</Link>
                            </td>
                            <td className="py-2 px-4 border-b">{formatPrice(payment.amount)} VNĐ</td>
                            <td className="py-2 px-4 border-b">
                                {format(new Date(payment.createdAt), 'dd/MM/yyyy, HH:mm')}
                            </td>
                            <td className="py-2 px-4 border-b">{payment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentTable;
