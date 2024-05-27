import PropTypes from 'prop-types';
import { faCirclePlay, faComment, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hDisplay = h > 0 ? h + ' giờ ' : '';
    const mDisplay = m > 0 ? m + ' phút ' : '';
    const sDisplay = s > 0 ? s + ' giây' : '';

    return hDisplay + mDisplay + sDisplay || '0 giây';
};

const Info = ({ title, description, duration, comments }) => {
    const safeDescription = description || 'Không có mô tả';

    return (
        <div className="px-5 md:px-10 xl:px-64 py-2">
            <h4 className="title text-2xl font-bold mb-2">{title}</h4>
            <div className="info flex">
                <div className="time">
                    <FontAwesomeIcon className="mr-1" icon={faCirclePlay} />
                    <span>{formatDuration(duration)}</span>
                </div>
                <div className="comment ml-3">
                    <FontAwesomeIcon className="mr-1" icon={faComment} />
                    <span>{comments.length}</span>
                </div>
            </div>
            <div className="flex justify-center mt-3 lg:mt-10">
                <a href="#!" className="bg-peach px-16 p-2 rounded-xl shadow-md text-white font-bold text-xl">
                    <span>Bài tập</span>
                    <FontAwesomeIcon className="ml-2" icon={faPenToSquare} />
                </a>
            </div>
            <div className="mt-5">
                <h4 className="text-xl font-bold mb-3">Mô tả bài học</h4>
                <div className="description">{safeDescription}</div>
            </div>
        </div>
    );
};

Info.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
};

export default Info;
