import React, { useState, useEffect } from 'react';
import paymentApi from '~/api/paymentApi'; // Đảm bảo rằng bạn có API để lấy dữ liệu thanh toán
import PaymentTable from './PaymentTable';
import Pagination from '~/components/Admin/Layout/Pagination';
import { toast } from 'react-toastify';

const ListPayment = ({ searchTerm }) => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchPayments(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const fetchPayments = async (page, searchTerm = '') => {
        try {
            const response = await paymentApi.getPage({ page, pageSize: 10, searchTerm });
            console.log("response", response);
            setPayments(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            toast.error('Lỗi khi tải danh sách thanh toán');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4 bg-white rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Danh sách thanh toán</h1>
            </div>
            <PaymentTable payments={payments} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default ListPayment;
