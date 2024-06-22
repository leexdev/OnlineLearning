import React from 'react';
import GradeItem from './GradeItem';

const TableGrade = ({ grades, handleEdit, setGradeToDelete, setShowDeleteModal }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-peach text-white">
                        <th className="py-3 px-4">Tên khối lớp</th>
                        <th className="py-3 px-4">Môn học</th>
                        <th className="py-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade) => (
                        <GradeItem
                            key={grade.id}
                            grade={grade}
                            handleEdit={handleEdit}
                            setGradeToDelete={setGradeToDelete}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableGrade;
