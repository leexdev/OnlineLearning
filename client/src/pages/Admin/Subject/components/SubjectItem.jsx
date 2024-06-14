// components/SubjectItem.js
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const SubjectItem = ({ subject, handleEdit, setSubjectToDelete, setShowDeleteModal }) => {
    console.log('subject', subject);
    return (
        <tr key={subject.id} className="text-center even:bg-gray-50">
            <td className="py-2 border-b px-4">{subject.id}</td>
            <td className="py-2 border-b px-4">{subject.name}</td>
            <td className="py-2 border-b px-4">{subject.gradeName}</td>
            <td className="py-2 border-b px-4 space-x-2">
                <button
                    onClick={() => handleEdit(subject)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-2 py-1 rounded shadow-md transition duration-200"
                >
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                    onClick={() => {
                        setSubjectToDelete(subject);
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

export default SubjectItem;
