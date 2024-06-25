import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DiscountModal from '../DiscountModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPercent, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '~/utils/formatPrice';

const CourseItem = ({ course, handleAddDiscount, handleDeleteDiscount, setCourseToDelete, setShowDeleteModal }) => {
    const [discountType, setDiscountType] = useState('percentage');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleDiscountSubmit = (discountType, discountValue) => {
        let calculatedNewPrice;

        if (discountType === 'percentage') {
            calculatedNewPrice = Math.round(course.price - (course.price * discountValue) / 100);
        } else if (discountType === 'amount') {
            calculatedNewPrice = course.price - discountValue;
        }

        handleAddDiscount(course.id, calculatedNewPrice);
        setIsModalVisible(false);
    };

    const handleDiscountRemove = () => {
        handleDeleteDiscount(course.id);
        setIsModalVisible(false);
    };

    return (
        <>
            <tr key={course.id} className="text-center even:bg-gray-50">
                <td className="py-2 border-b px-4 flex justify-center">
                    <img className="w-52" src={course.imageUrl} alt="Ảnh khóa học" />
                </td>
                <td className="py-2 border-b px-4">
                    <Link to={`/course/${course.id}`}>{course.name}</Link>
                </td>
                <td className="py-2 border-b px-4">
                    {course.newPrice ? (
                        <div>
                            <span className="line-through text-red-500">{formatPrice(course.price)} VNĐ</span>
                            <span>
                                {' -> '}
                                {formatPrice(course.newPrice)} VNĐ
                            </span>
                        </div>
                    ) : (
                        <span>{formatPrice(course.price)} VNĐ</span>
                    )}
                </td>
                <td className="py-2 border-b px-4 space-x-2">
                    <button
                        onClick={() => setIsModalVisible(true)}
                        className="bg-teal-400 hover:bg-teal-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                    >
                        <span>
                            <FontAwesomeIcon className="mr-1" icon={faPercent} />
                            Áp dụng giảm giá
                        </span>
                    </button>
                    <Link
                        to={`/admin/course/edit/${course.id}`}
                        className="bg-yellow-400 hover:bg-yellow-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                    >
                        <span>
                            <FontAwesomeIcon className="mr-1" icon={faPen} />
                            Sửa
                        </span>
                    </Link>
                    <button
                        onClick={() => {
                            setCourseToDelete(course);
                            setShowDeleteModal(true);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                    >
                        <span>
                            <FontAwesomeIcon className="mr-1" icon={faTrash} />
                            Xóa
                        </span>
                    </button>
                </td>
            </tr>

            <DiscountModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                discountType={discountType}
                setDiscountType={setDiscountType}
                handleDiscountRemove={handleDiscountRemove}
                handleDiscountSubmit={handleDiscountSubmit}
                coursePrice={course.price}
            />
        </>
    );
};

export default CourseItem;
