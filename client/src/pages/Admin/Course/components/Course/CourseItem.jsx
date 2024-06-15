import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const CourseItem = ({ course, handleEdit, setCourseToDelete, setShowDeleteModal }) => {
    return (
        <tr key={course.id} className="text-center even:bg-gray-50">
            <td className="py-2 border-b px-4">{course.id}</td>
            <td className="py-2 border-b px-4">{course.name}</td>
            <td className="py-2 border-b px-4">{course.subjectName}</td>
            <td className="py-2 border-b px-4">{course.price}</td>
            <td className="py-2 border-b px-4 space-x-2">
                <button
                    onClick={() => handleEdit(course)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                >
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                    onClick={() => {
                        setCourseToDelete(course);
                        setShowDeleteModal(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </td>
        </tr>
    );
};

export default CourseItem;
