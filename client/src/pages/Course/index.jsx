import { Fragment } from 'react';
import Header from './components/header';
import BreadCrumb from '~/components/breadcrumb';
import Nav from './components/nav';
import Info from './components/info';
import Syllabus from './components/syllabus';
import Sidebar from './components/sidebar';

const Course = () => {
    return (
        <Fragment>
            <BreadCrumb />
            <Header />
            <div className="bg-content pt-5">
                <div className="container">
                        <Sidebar />
                    <div className="lg:w-2/3">
                        <Nav />
                        <Info />
                        <Syllabus />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Course;
