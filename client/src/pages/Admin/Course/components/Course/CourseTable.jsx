import React from 'react';
import CourseItem from './CourseItem';

const CourseTable = ({ courses, handleAddDiscount, handleDeleteDiscount , setCourseToDelete, setShowDeleteModal }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-peach text-white">
                        <th className="py-3 px-4">Ảnh khóa học</th>
                        <th className="py-3 px-4">Tên khóa học</th>
                        <th className="py-3 px-4">Giá</th>
                        <th className="py-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <CourseItem
                            key={course.id}
                            course={course}
                            handleAddDiscount={handleAddDiscount}
                            handleDeleteDiscount={handleDeleteDiscount}
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
