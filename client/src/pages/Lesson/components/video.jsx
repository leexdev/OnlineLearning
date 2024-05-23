import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

const Video = () => {
    return (
        <div className="items-center justify-center mb-4 rounded bg-gray-50">
            <Player
                aspectRatio="16:9"
                autoPlay
                src="https://firebasestorage.googleapis.com/v0/b/learningonline-91538.appspot.com/o/video_lesson%2FY2meta.app-H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20s%E1%BB%AD%20d%E1%BB%A5ng%20kh%C3%B3a%20h%E1%BB%8Dc%20Vuihoc.vn%20tr%C3%AAn%20m%C3%A1y%20t%C3%ADnh-(1080p).mp4?alt=media&token=d94d67df-7a81-40e6-959a-6bc321fadaea"
            ></Player>
        </div>
    );
};

export default Video;
