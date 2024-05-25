import Slider from './components/Slider';
import Banner from './components/Banner';
import Course from './components/Course';
import Steps from './components/Steps';
import News from './components/News';
import { Fragment } from 'react';

const Home = () => {
    return (
        <Fragment>
            <Slider />
            <Banner />
            <Course title="Khóa toán nổi bật" />
            <Course title="Khóa tiếng việt nổi bật" />
            <Course title="Khóa tiếng anh nổi bật" />
            <Steps />
            <News />
        </Fragment>
    );
};

export default Home;
