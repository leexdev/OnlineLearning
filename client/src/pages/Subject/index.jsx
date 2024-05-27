import React, { Fragment } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ListCourse from './components/Course';

const Subject = () => {
    const location = useLocation();
    const { subjectName, gradeName, subjectId } = location.state || { subjectName: 'Tất cả các khóa học', gradeName: '' };

    return (
        <Fragment>
            <ListCourse subjectId={subjectId} subjectName={subjectName} gradeName={gradeName} />
        </Fragment>
    );
};

export default Subject;