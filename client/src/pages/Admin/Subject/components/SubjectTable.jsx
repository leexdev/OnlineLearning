// components/SubjectTable.js
import React from 'react';
import SubjectItem from './SubjectItem';

const SubjectTable = ({ subjects, handleEdit, setSubjectToDelete, setShowDeleteModal }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-peach text-white">
                        <th className="py-3 px-4">Tên môn học</th>
                        <th className="py-3 px-4">Khối lớp</th>
                        <th className="py-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <SubjectItem
                            key={subject.id}
                            subject={subject}
                            handleEdit={handleEdit}
                            setSubjectToDelete={setSubjectToDelete}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubjectTable;
