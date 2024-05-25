import React, { Fragment } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ListCourse from './components/Course';
import BreadCrumb from '~/components/Layouts/DefaultLayout/components/BreadCrumb';

const Subject = () => {
    const { subjectId } = useParams();
    const location = useLocation();
    const { subjectName, gradeName } = location.state || { subjectName: 'Tất cả các khóa học', gradeName: '' };

    return (
        <Fragment>
            <BreadCrumb />
            <ListCourse subjectId={subjectId} subjectName={subjectName} gradeName={gradeName} />
        </Fragment>
    );
};

export default Subject;
