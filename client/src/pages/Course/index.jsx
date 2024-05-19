import BreadCrumb from './components/breadcrumb';
import { Fragment } from 'react';
import ListCourse from './components/listcourse';

const Course = () => {
    return (
        <Fragment>
            <BreadCrumb />
            <ListCourse/>
        </Fragment>
    );
};

export default Course;
