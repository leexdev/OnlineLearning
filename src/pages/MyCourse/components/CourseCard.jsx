// CourseCard.jsx
import { faAlignRight, faAngleRight, faChartPie, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg w-full">
            <div className="bg-gray-100">
                <img src={course.imageUrl} alt={course.title} className="w-full" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-700">{course.description}</p>
            </div>
            <div className="p-4 flex justify-between">
                <Link
                    to="/my-process"
                    state={{ courseId: course.id }}
                    className="bg-green-500 text-white xl:py-2 xl:px-7 p-2 rounded hover:bg-green-600"
                >
                    <FontAwesomeIcon className="md:mr-3" icon={faChartPie} />
                    <span>TIẾN ĐỘ</span>
                </Link>
                <Link
                    to={`/course/${course.id}`}
                    className="bg-red-500 text-white xl:py-2 xl:px-7 p-2 rounded hover:bg-red-600"
                >
                    <span>VÀO HỌC</span>
                    <FontAwesomeIcon className="md:ml-3" icon={faAngleRight} />
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;
