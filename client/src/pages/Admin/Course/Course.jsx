import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import ListCourse from './components/ListCourse';

const Course = () => {
    return (
        <div>
            <Header />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Danh sách khóa học</h1>
                <Link
                    to="/admin/course/create"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                >
                    Thêm khóa học
                </Link>
            </div>
            <ListCourse />
        </div>
    );
};

export default Course;
