import { Fragment } from 'react';
import Header from './components/Header';
import BreadCrumb from '~/components/Layouts/DefaultLayout/components/BreadCrumb';
import Nav from './components/Navbar';
import Info from './components/Info';
import Syllabus from './components/Syllabus';
import Sidebar from './components/Sidebar';

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
