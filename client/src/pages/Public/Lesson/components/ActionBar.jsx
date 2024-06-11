import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const ActionBar = ({ previousLesson, nextLesson, handleLessonClick }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white border-t border-gray-200 p-2 md:justify-end">
            <div className="flex justify-center items-center w-full max-w-screen-lg mx-auto">
                {previousLesson ? (
                    <button
                        onClick={() => handleLessonClick(previousLesson.id)}
                        className="uppercase font-bold text-gray-600 p-2"
                    >
                        <FontAwesomeIcon className="mr-1" icon={faAngleLeft} />
                        <span>Bài trước</span>
                    </button>
                ) : (
                    <span className="uppercase font-semibold text-gray-400 p-2">
                        <FontAwesomeIcon className="mr-1" icon={faAngleLeft} />
                        <span>Bài trước</span>
                    </span>
                )}
                {nextLesson ? (
                    <button
                        onClick={() => handleLessonClick(nextLesson.id)}
                        className="uppercase font-bold text-gray-600 ml-5 p-2 border-2 border-peach rounded-md"
                    >
                        <span>Bài tiếp theo</span>
                        <FontAwesomeIcon className="ml-1" icon={faAngleRight} />
                    </button>
                ) : (
                    <span className="uppercase font-semibold text-gray-400 ml-5 p-2 border-2 border-peach rounded-md">
                        <span>Bài tiếp theo</span>
                        <FontAwesomeIcon className="ml-1" icon={faAngleRight} />
                    </span>
                )}
            </div>
        </div>
    );
};

ActionBar.propTypes = {
    previousLesson: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
    }),
    nextLesson: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
    }),
    handleLessonClick: PropTypes.func.isRequired,
};

export default ActionBar;