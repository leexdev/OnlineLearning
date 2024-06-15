import React from 'react';
import CourseItem from './CourseItem';

const CourseTable = ({ courses, handleEdit, setCourseToDelete, setShowDeleteModal }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-peach text-white">
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Tên khóa học</th>
                        <th className="py-3 px-4">Môn học</th>
                        <th className="py-3 px-4">Giá</th>
                        <th className="py-3 px-4">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <CourseItem
                            key={course.id}
                            course={course}
                            handleEdit={handleEdit}
                            setCourseToDelete={setCourseToDelete}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;
