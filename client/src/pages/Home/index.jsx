import Slider from './components/slider';
import Banner from './components/banner';
import Course from './components/course';
import Steps from './components/steps';
import News from './components/news';
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
