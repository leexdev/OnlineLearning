import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            navigate(`${location.pathname}?page=${currentPage - 1}`);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            navigate(`${location.pathname}?page=${currentPage + 1}`);
        }
    };

    const handlePageClick = (page) => {
        onPageChange(page);
        navigate(`${location.pathname}?page=${page}`);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(currentPage - 3, 1);
        const endPage = Math.min(currentPage + 3, totalPages);

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => handlePageClick(1)}
                    className={`px-3 py-1 rounded-md mx-1 ${currentPage === 1 ? 'bg-peach text-white' : 'bg-gray-200'}`}
                >
                    1
                </button>,
            );

            if (startPage > 2) {
                pageNumbers.push(
                    <span key="ellipsis1" className="mx-2">
                        ...
                    </span>,
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-3 py-1 rounded-md mx-1 ${currentPage === i ? 'bg-peach text-white' : 'bg-gray-200'}`}
                >
                    {i}
                </button>,
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <span key="ellipsis2" className="mx-2">
                        ...
                    </span>,
                );
            }

            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={`px-3 py-1 rounded-md mx-1 ${
                        currentPage === totalPages ? 'bg-peach text-white' : 'bg-gray-200'
                    }`}
                >
                    {totalPages}
                </button>,
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-peach text-white'}`}
            >
                Trước
            </button>
            <div className="flex items-center">{renderPageNumbers()}</div>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-peach text-white'}`}
            >
                Sau
            </button>
        </div>
    );
};

export default Pagination;
