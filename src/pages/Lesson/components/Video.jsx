import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

const Video = ({ videoURL, onEnded }) => {
    return (
        <div className="items-center justify-center mb-4 rounded bg-gray-50">
            <Player
                aspectRatio="16:9"
                autoPlay
                src={videoURL}
                onEnded={onEnded}
            />
        </div>
    );
};

export default Video;
