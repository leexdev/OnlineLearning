import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col">
            <div className="bg-gray-100">
                <img src={course.imageUrl} alt={course.title} className="w-full h-60 object-cover" />
            </div>
            <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-2">{course.name}</h2>
                <p className="text-gray-700 line-clamp-3">{course.title}</p>
            </div>
            <div className="p-4 flex justify-between">
                <Link
                    to="/my-course/my-process"
                    state={{ courseId: course.id, courseName: course.name }}
                    className="bg-green-500 text-white xl:py-2 xl:px-7 p-2 rounded hover:bg-green-600 flex items-center"
                >
                    <FontAwesomeIcon className="md:mr-3" icon={faChartPie} />
                    <span>TIẾN ĐỘ</span>
                </Link>
                <Link
                    to={`/course/${course.id}`}
                    className="bg-red-500 text-white xl:py-2 xl:px-7 p-2 rounded hover:bg-red-600 flex items-center"
                >
                    <span>VÀO HỌC</span>
                    <FontAwesomeIcon className="md:ml-3" icon={faAngleRight} />
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;
