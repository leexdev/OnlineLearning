import React from 'react';

const CourseList = ({ children }) => {
    return (
        <div className="grid course-item grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {children}
        </div>
    );
};

export default CourseList;
