import React from 'react';
import PropTypes from 'prop-types';
import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

CourseList.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CourseList;
