import React, { Fragment } from 'react';
import Slider from './components/Slider';
import Banner from './components/Banner';
import Course from './components/Course';
import Steps from './components/Steps';
import News from './components/News';

const Home = () => {
    return (
        <Fragment>
            <Slider />
            <Banner />
            <Course title="Khóa toán nổi bật" subjectName="Toán học" />
            <Course title="Khóa tiếng việt nổi bật" subjectName="Tiếng Việt" />
            <Course title="Khóa tiếng anh nổi bật" subjectName="Tiếng Anh" />
            <Steps />
            <News />
        </Fragment>
    );
};

export default Home;
