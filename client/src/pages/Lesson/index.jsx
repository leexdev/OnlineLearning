import { Fragment, useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import Video from './components/video';
import Info from './components/info';
import Comment from './components/comment';

const Lesson = () => {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        // Lấy và lưu thời lượng video khi metadata được tải
        const videoElement = document.getElementsByTagName('video')[0];
        if (videoElement) {
            videoElement.addEventListener('loadedmetadata', () => {
                const durationInSeconds = Math.floor(videoElement.duration);
                setDuration(durationInSeconds);
            });
        }
    }, []);

    return (
        <Fragment>
            <Sidebar />
            <div className="md:mr-64 xl:mr-96">
                <Video />
                <Info duration={duration} rating={2} totalReviews={243} />
                <Comment />
            </div>
        </Fragment>
    );
};

export default Lesson;
