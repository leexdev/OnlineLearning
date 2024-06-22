import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const GradeItem = ({ grade, handleEdit, setGradeToDelete, setShowDeleteModal }) => {
    return (
        <tr key={grade.id} className="text-center even:bg-gray-50">
            <td className="py-2 border-b px-4">{grade.name}</td>
            <td className="py-2 border-b px-4">
                <ul className="list-inside">
                    {grade.subjects.map((subject) => (
                        <li key={subject.id}>{subject.name}</li>
                    ))}
                </ul>
            </td>
            <td className="py-2 border-b px-4 space-x-2">
                <button
                    onClick={() => handleEdit(grade)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                >
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                    onClick={() => {
                        setGradeToDelete(grade);
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

export default GradeItem;
