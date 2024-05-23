import { Fragment } from 'react';
import ListCourse from './components/listcourse';
import BreadCrumb from '~/components/breadcrumb';

const Subject = () => {
    return (
        <Fragment>
            <BreadCrumb />
            <ListCourse/>
        </Fragment>
    );
};

export default Subject;
